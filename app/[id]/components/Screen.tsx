'use client';

import { OptionList } from './OptionList';
import type { Screen } from '@/types/Screen';
import { useSurvey } from '@/components/SurveyContext';
import type { Choice } from '@/types/Choice';
import { DynamicField } from '@/types/DynamicField';
import { SurveyConfig } from '@/app/surveyConfig';

function processDynamicText(
  text: string,
  dynamicFields: DynamicField<string>[number],
  answers: {
    [key: string]: number;
  },
  screens: Screen[]
) {
  return text.replace(/{(.*?)}/g, (_, key) => {
    const field = dynamicFields.find(({ field }) => field === key);

    if (field) {
      if (field.type === 'answer') {
        const screen = screens.find((item) => item.id === field.screenId);

        return screen?.choices.find((choice) => choice.id === answers[field.screenId])?.title || '';
      } else if (field.type === 'conditional') {
        const conditionMet = answers[field.condition.referringScreenId] === field.condition.expectedChoiceId;

        return conditionMet ? key : '';
      }
    }

    return '';
  });
}

const getScreenLogic = (question: Screen, logic: SurveyConfig['logic']) =>
  logic.find(({ referringId }) => referringId === question.id);

export function Screen({
  screen,
  logic,
  screens,
  dynamicFields,
}: {
  screen: Screen;
  logic: SurveyConfig['logic'];
  screens: Screen[];
  dynamicFields: SurveyConfig['dynamicFields'];
}) {
  const [survey, setSurvey] = useSurvey();

  const getNextScreenId = (choice: Choice) => {
    let nextScreenId = '';
    const questionLogic = getScreenLogic(screen, logic);

    if (!questionLogic) {
      return '';
    }

    if (questionLogic?.explicitNextId) {
      nextScreenId = questionLogic.explicitNextId;
    } else {
      const conditionMet = questionLogic.conditions?.find((condition) => {
        const savedAnswer = survey ? survey[condition.referringScreenId || screen.id] : null;

        const answer = condition.referringScreenId ? savedAnswer : choice.id;

        return condition.expectedChoiceId === answer;
      });

      nextScreenId = conditionMet?.nextScreenId || '';
    }

    return `/${nextScreenId}`;
  };

  const handleChoiceSelect = (choice: Choice) => () => {
    setSurvey({ ...(survey || {}), [screen.id]: choice.id });

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('surveyAnswers', JSON.stringify({ ...(survey || {}), [screen.id]: choice.id }));
    }
  };

  const formattedTitle =
    dynamicFields && survey
      ? processDynamicText(screen.title, dynamicFields[screen.id] ?? [], survey, screens)
      : screen.title;

  return (
    <div className={'flex flex-col w-330 gap-y-7'}>
      <h1 className={'text-2xl font-bold'}>{formattedTitle}</h1>

      {screen.subtext && <p>{screen.subtext}</p>}

      {screen.text && <p>{screen.text}</p>}

      <OptionList options={screen.choices} onSelect={handleChoiceSelect} getPath={getNextScreenId} />
    </div>
  );
}
