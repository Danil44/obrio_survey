'use client';

import { OptionList } from './OptionList';
import type { Screen } from '@/src/types/Screen';
import { useSurvey } from '@/src/components/SurveyContext';
import type { Choice } from '@/src/types/Choice';
import { DynamicField } from '@/src/types/DynamicField';

function processDynamicText(
  text: string,
  dynamicFields: DynamicField[],
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
        const conditionMet = answers[field.condition.screenId] === field.condition.expectedChoiceId;

        return conditionMet ? key : '';
      }
    }

    return '';
  });
}

export function Screen({ screen, screens }: { screen: Screen; screens: Screen[] }) {
  const [survey, setSurvey] = useSurvey();

  const getNextScreenId = (choice: Choice) => {
    const nextScreenInstruction = screen.next[choice.id];

    if (Array.isArray(nextScreenInstruction)) {
      const nextScreenId = nextScreenInstruction.find(
        ({ condition }) => survey && survey[condition.screenId] === condition.expectedChoiceId
      )?.screenId;

      return `/${nextScreenId}`;
    }

    return `/${nextScreenInstruction}`;
  };

  const handleChoiceSelect = (choice: Choice) => () => {
    setSurvey({ ...(survey || {}), [screen.id]: choice.id });

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('surveyAnswers', JSON.stringify({ ...(survey || {}), [screen.id]: choice.id }));
      window.localStorage.setItem('previousScreenId', screen.id);
    }
  };

  const checkIsOptionActive = (choice: Choice) => {
    return Boolean(survey && screen.choices.length > 1 && survey[screen.id] === choice.id);
  };

  const formattedTitle =
    screen.dynamicFields && survey
      ? processDynamicText(screen.title, screen.dynamicFields ?? [], survey, screens)
      : screen.title;

  return (
    <div className={'flex flex-col w-330 gap-y-7'}>
      <h1 className={'text-2xl font-bold text-typography dark:text-light dark:text-center'}>{formattedTitle}</h1>

      {/*{screen. && (*/}
      {/*  <p className={'text-lg font-bold text-typography dark:text-light dark:text-center'}>{screen.subtext}</p>*/}
      {/*)}*/}

      {screen.text && (
        <p className={'text-typography font-normal text-sm dark:text-light dark:text-center leading-loose'}>
          {screen.text}
        </p>
      )}

      <OptionList options={screen.choices} onSelect={handleChoiceSelect} getPath={getNextScreenId} />
    </div>
  );
}
