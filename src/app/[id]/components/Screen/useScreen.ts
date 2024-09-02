import { Choice } from '@/src/types/Choice';
import { useSurvey } from '@/src/store/survey';
import type { Screen } from '@/src/types/Screen';
import { useMemo } from 'react';

export const useScreen = (screen: Screen, screens: Screen[]) => {
  const { survey, updateSurvey } = useSurvey();

  const selectChoice = (choice: Choice) => () => {
    updateSurvey({ ...(survey || {}), [screen.id]: choice.id });
  };

  const checkIsOptionActive = (choice: Choice) => {
    return Boolean(survey && screen.choices.length > 1 && survey[screen.id] === choice.id);
  };

  const title = useMemo(
    () =>
      screen.title.replace(/{(.*?)}/g, (_, key) => {
        const field = screen.dynamicFields?.find(({ field }) => field === key);
        if (field) {
          if (field.type === 'answer') {
            const screen = screens.find((item) => item.id === field.screenId);

            return screen?.choices.find((choice) => choice.id === survey[field.screenId])?.title || '';
          } else if (field.type === 'conditional') {
            const conditionMet = survey[field.condition.screenId] === field.condition.expectedChoiceId;

            return conditionMet ? key : '';
          }
        }

        return '';
      }),
    [screen, survey, screens]
  );

  return { title, selectChoice, checkIsOptionActive };
};
