import { useCallback, useMemo } from 'react';
import type { Screen } from '@/src/types/Screen';
import { useSurvey } from '@/src/store/survey';
import { Choice } from '@/src/types/Choice';

export const useScreensNavigation = ({ screens, currentScreen }: { screens: Screen[]; currentScreen: Screen }) => {
  const { survey, updateSurvey } = useSurvey();

  const previousScreenId = useMemo(() => {
    const previousScreenIds = screens
      .filter((screen) => {
        return Object.values(screen.next).some((value) => {
          if (Array.isArray(value)) {
            return value.find(({ screenId }) => screenId === currentScreen.id);
          }

          return value === currentScreen.id;
        });
      })
      .map((screen) => screen.id);

    return previousScreenIds.find((screenId) => survey && Boolean(survey[screenId])) || 'gender';
  }, [currentScreen, screens, survey]);

  const clearCurrentAnswer = useCallback(() => {
    const { [currentScreen.id]: value, ...withoutCurrentAnswer } = survey || {};

    updateSurvey(withoutCurrentAnswer);
  }, [currentScreen, survey, updateSurvey]);

  const getNextScreenId = (choice: Choice) => {
    const nextScreenInstruction = currentScreen.next[choice.id];

    if (Array.isArray(nextScreenInstruction)) {
      const nextScreenId = nextScreenInstruction.find(
        ({ condition }) => survey && survey[condition.screenId] === condition.expectedChoiceId
      )?.screenId;

      return `/${nextScreenId}`;
    }

    return `/${nextScreenInstruction || currentScreen.id}`;
  };

  return { getNextScreenId, previousScreenId, clearCurrentAnswer };
};
