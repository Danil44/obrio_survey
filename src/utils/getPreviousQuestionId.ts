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
  return questionList.reduce((prevId, question) => {
    if (!prevId && checkIsPreviousQuestion(question, currentQuestion.id) && survey[question.id]) {
      return question.id;
    }
    return prevId;
  }, '');
}
