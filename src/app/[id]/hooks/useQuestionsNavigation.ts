import { useCallback, useMemo } from 'react';
import type { Question } from '@/src/types/Question';
import { useAnswers } from '@/src/store/answers';
import { Choice } from '@/src/types/Choice';
import { getPreviousQuestionId } from '@/src/utils/getPreviousQuestionId';
import { getNextQuestionId } from '@/src/utils/getNextQuestionId';

export const useQuestionsNavigation = ({
  questionList,
  currentQuestion,
}: {
  questionList: Question[];
  currentQuestion: Question;
}) => {
  const { answers } = useAnswers();

  const previousQuestionPath = useMemo(
    () => `/${getPreviousQuestionId(questionList, currentQuestion, answers)}`,
    [currentQuestion, questionList, answers]
  );

  const getNextQuestionPath = useCallback(
    (choice: Choice) => `/${getNextQuestionId(currentQuestion, choice, answers)}`,
    [currentQuestion, answers]
  );

  return { getNextQuestionPath, previousQuestionPath };
};
