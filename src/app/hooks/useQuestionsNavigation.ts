import { useCallback, useMemo } from 'react';
import { getPreviousQuestionId } from '@/utils/getPreviousQuestionId';
import { getNextQuestionId } from '@/utils/getNextQuestionId';
import { Choice } from '@/types/Choice';
import { useAnswersStore } from '@/stores/AnswersProvider';
import { selectQuestionById, useQuestionsStore } from '@/stores/QuestionsProvider';

export const useQuestionsNavigation = () => {
  const { answers } = useAnswersStore((state) => state);

  const { questions, currentQuestion } = useQuestionsStore((state) => ({
    ...state,
    currentQuestion: selectQuestionById(state),
  }));

  const previousQuestionPath = useMemo(() => {
    const previousQuestionId = currentQuestion ? getPreviousQuestionId(questions, currentQuestion, answers) : '';

    return previousQuestionId ? `/${previousQuestionId}` : '';
  }, [currentQuestion, questions, answers]);

  const getNextQuestionPath = useCallback(
    (choice: Choice) => {
      const nextQuestionId = currentQuestion ? getNextQuestionId(currentQuestion, choice, answers) : '';

      return nextQuestionId ? `/${nextQuestionId}` : '';
    },
    [currentQuestion, answers]
  );

  return { getNextQuestionPath, previousQuestionPath };
};
