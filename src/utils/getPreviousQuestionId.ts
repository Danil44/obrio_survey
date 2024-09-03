import type { Question } from '@/src/types/Question';
import { Answers } from '@/src/store/answers';

function checkIsPreviousQuestion(question: Question, currentQuestionId: string) {
  return Object.values(question.next).some((value) => {
    if (Array.isArray(value)) {
      return value.some(({ questionId }) => questionId === currentQuestionId);
    }
    return value === currentQuestionId;
  });
}

export function getPreviousQuestionId(questionList: Question[], currentQuestion: Question, survey: Answers) {
  const previousQuestionIds = questionList
    .filter((question) => checkIsPreviousQuestion(question, currentQuestion.id))
    .map((question) => question.id);

  return previousQuestionIds.find((questionId) => Boolean(survey[questionId])) || '';
}
