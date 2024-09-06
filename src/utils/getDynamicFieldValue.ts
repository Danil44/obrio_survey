import { Condition } from '@/types/Condition';
import { Question } from '@/types/Question';
import { Answers } from '@/types/Answers';

type GetConditionalValueInput = {
  field: string;
  condition: Condition;
  answers: Answers;
};

function getConditionalValue({ field, condition, answers }: GetConditionalValueInput) {
  const conditionMet = answers[condition.questionId] === condition.expectedChoiceId;
  return conditionMet ? field : '';
}

type GetAnswerValueInput = {
  questionId: string;
  questionList: Question[];
  answers: Answers;
};

function getAnswerValue({ questionId, questionList, answers }: GetAnswerValueInput) {
  const relatedQuestion = questionList.find(({ id }) => id === questionId);
  if (!relatedQuestion) return '';

  const selectedChoice = relatedQuestion.choices.find(({ id }) => id === answers[questionId]);
  return selectedChoice?.title || '';
}

type GetDynamicFieldValueInput = {
  key: string;
  question: Question;
  questionList: Question[];
  answers: Answers;
};

export function getDynamicFieldValue({ key, question, questionList, answers }: GetDynamicFieldValueInput) {
  const dynamicField = question.dynamicFields?.find(({ field }) => field === key);

  if (!dynamicField) return '';

  if (dynamicField.type === 'answer') {
    return getAnswerValue({ questionId: dynamicField.questionId, questionList, answers });
  }

  if (dynamicField.type === 'conditional') {
    return getConditionalValue({ field: dynamicField.field, condition: dynamicField.condition, answers });
  }

  return '';
}
