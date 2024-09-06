import { Condition } from '@/types/Condition';
import { Question } from '@/types/Question';
import { Answers } from '@/types/Answers';

function getConditionalValue(field: string, condition: Condition, answers: Answers) {
  const conditionMet = answers[condition.questionId] === condition.expectedChoiceId;
  return conditionMet ? field : '';
}

function getAnswerValue(questionId: string, questionList: Question[], answers: Answers) {
  const relatedQuestion = questionList.find(({ id }) => id === questionId);
  if (!relatedQuestion) return '';

  const selectedChoice = relatedQuestion.choices.find(({ id }) => id === answers[questionId]);
  return selectedChoice?.title || '';
}

export function getDynamicFieldValue(key: string, question: Question, questionList: Question[], answers: Answers) {
  const dynamicField = question.dynamicFields?.find(({ field }) => field === key);

  if (!dynamicField) return '';

  if (dynamicField.type === 'answer') {
    return getAnswerValue(dynamicField.questionId, questionList, answers);
  }

  if (dynamicField.type === 'conditional') {
    return getConditionalValue(dynamicField.field, dynamicField.condition, answers);
  }

  return '';
}
