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

type GetPreviousQuestionIdInput = {
  questions: Question[];
  currentQuestion: Question;
  answers: Answers;
};

export function getPreviousQuestionId({ questions, currentQuestion, answers }: GetPreviousQuestionIdInput) {
  return questions.reduce((prevId, question) => {
    if (!prevId && checkIsPreviousQuestion(question, currentQuestion.id) && answers[question.id]) {
      return question.id;
    }

    return prevId;
  }, '');
}
