import { Choice } from '@/src/types/Choice';
import { Survey, useSurvey } from '@/src/store/survey';
import { Screen } from '@/src/types/Screen';
import { useMemo } from 'react';
import { Condition } from '@/src/types/Condition';

const getConditionalFieldValue = (field: string, condition: Condition, survey: Survey) => {
  const conditionMet = survey[condition.screenId] === condition.expectedChoiceId;
  return conditionMet ? field : '';
};

const getAnswerFieldValue = (screenId: string, screens: Screen[], survey: Survey) => {
  const relatedScreen = screens.find(({ id }) => id === screenId);
  if (!relatedScreen) return '';

  const selectedChoice = relatedScreen.choices.find(({ id }) => id === survey[screenId]);
  return selectedChoice?.title || '';
};

const getFieldValue = (key: string, screen: Screen, screens: Screen[], survey: Survey) => {
  const dynamicField = screen.dynamicFields?.find(({ field }) => field === key);
  
  if (!dynamicField) return '';

  if (dynamicField.type === 'answer') {
    return getAnswerFieldValue(dynamicField.screenId, screens, survey);
  }

  if (dynamicField.type === 'conditional') {
    return getConditionalFieldValue(dynamicField.field, dynamicField.condition, survey);
  }

  return '';
};

export const useScreen = (screen: Screen, screens: Screen[]) => {
  const { survey, updateSurvey } = useSurvey();

  const selectChoice = (choice: Choice) => () => {
    updateSurvey({ ...(survey || {}), [screen.id]: choice.id });
  };

  const checkIsOptionActive = (choice: Choice) => {
    return Boolean(survey && screen.choices.length > 1 && survey[screen.id] === choice.id);
  };

  const title = useMemo(
    () => screen.title.replace(/{(.*?)}/g, (_, key) => getFieldValue(key, screen, screens, survey)),
    [screen, survey, screens]
  );

  return { title, selectChoice, checkIsOptionActive };
};
