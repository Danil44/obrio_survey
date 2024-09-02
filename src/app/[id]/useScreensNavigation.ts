import { useCallback, useMemo } from 'react';
import type { Screen } from '@/src/types/Screen';
import { Survey, useSurvey } from '@/src/store/survey';
import { Choice } from '@/src/types/Choice';

const getPreviousScreenId = (screens: Screen[], currentScreen: Screen, survey: Survey) => {
  const previousScreenIds = screens
    .filter((screen) => isPreviousScreen(screen, currentScreen.id))
    .map((screen) => screen.id);

  return previousScreenIds.find((screenId) => Boolean(survey[screenId])) || 'gender';
};

const isPreviousScreen = (screen: Screen, currentScreenId: string) => {
  return Object.values(screen.next).some((value) => {
    if (Array.isArray(value)) {
      return value.some(({ screenId }) => screenId === currentScreenId);
    }
    return value === currentScreenId;
  });
};

const removeCurrentAnswer = (survey: Survey, currentScreenId: string) => {
  const { [currentScreenId]: _, ...withoutCurrentAnswer } = survey || {};
  return withoutCurrentAnswer;
};

const determineNextScreenId = (currentScreen: Screen, choice: Choice, survey: Survey) => {
  const nextScreenInstruction = currentScreen.next[choice.id];

  if (Array.isArray(nextScreenInstruction)) {
    return (
      nextScreenInstruction.find(({ condition }) => survey[condition.screenId] === condition.expectedChoiceId)
        ?.screenId || currentScreen.id
    );
  }

  return nextScreenInstruction || currentScreen.id;
};

export const useScreensNavigation = ({ screens, currentScreen }: { screens: Screen[]; currentScreen: Screen }) => {
  const { survey, updateSurvey } = useSurvey();

  const previousScreenId = useMemo(
    () => getPreviousScreenId(screens, currentScreen, survey),
    [currentScreen, screens, survey]
  );

  const clearCurrentAnswer = useCallback(() => {
    updateSurvey(removeCurrentAnswer(survey, currentScreen.id));
  }, [currentScreen.id, survey, updateSurvey]);

  const getNextScreenId = (choice: Choice) => {
    return `/${determineNextScreenId(currentScreen, choice, survey)}`;
  };

  return { getNextScreenId, previousScreenId, clearCurrentAnswer };
};
