import { Question } from '@/types/Question';
import { Answers } from '@/types/Answers';

function checkIsPreviousQuestion(question: Question, currentQuestionId: string) {
  return Object.values(question.next).some((value) => {
    if (Array.isArray(value)) {
      return value.some(({ questionId }) => questionId === currentQuestionId);
    }

    return value === currentQuestionId;
  });
}

export function getPreviousQuestionId(questionList: Question[], currentQuestion: Question, answers: Answers) {
  return questionList.reduce((prevId, question) => {
    if (!prevId && checkIsPreviousQuestion(question, currentQuestion.id) && answers[question.id]) {
      return question.id;
    }

    return prevId;
  }, '');
}
