import { Condition } from '@/src/types/Condition';
import { Answers } from '@/src/store/answers';
import type { Question } from '@/src/types/Question';
import { Choice } from '@/src/types/Choice';

function isAnswerMatchingCondition(condition: Condition, answers: Answers) {
  return answers[condition.questionId] === condition.expectedChoiceId;
}

export function getNextQuestionId(currentQuestion: Question, choice: Choice, answers: Answers) {
  const nextQuestion = currentQuestion.next[choice.id];

  if (Array.isArray(nextQuestion)) {
    const questionIdByAnswer = nextQuestion.find(({ condition }) =>
      isAnswerMatchingCondition(condition, answers)
    )?.questionId;

    return questionIdByAnswer || currentQuestion.id;
  }

  return nextQuestion || currentQuestion.id;
}
