'use client';

import { OptionList } from './OptionList';
import type { Question } from '@/types/Question';
import { useSurvey } from '@/components/SurveyContext';
import type { Choice } from '@/types/Choice';
import { DynamicField } from '@/types/DynamicField';

function processDynamicText(
  text: string,
  dynamicFields: DynamicField[],
  answers: {
    [key: number]: number;
  },
  questions: Question[]
) {
  return text.replace(/{(.*?)}/g, (_, key) => {
    const field = dynamicFields.find(({ field }) => field === key);

    if (field) {
      if (field.type === 'answer') {
        const question = questions.find((question) => question.id === field.questionId);

        return question?.choices.find((choice) => choice.id === answers[field.questionId])?.title || '';
      } else if (field.type === 'conditional') {
        const conditionMet = answers[field.condition.questionId] === field.condition.expectedChoiceId;

        return conditionMet ? key : '';
      }
    }

    return '';
  });
}

export function Question({ question, questions }: { question: Question; questions: Question[] }) {
  const [survey, setSurvey] = useSurvey();

  const getNextQuestionId = (choice: Choice) => {
    if (question.nextQuestionId) {
      return `/${question.nextQuestionId}`;
    }

    const conditionMet = question.logic.find((logic) =>
      logic.conditions.every((condition) => {
        const savedAnswer = survey ? survey[condition.questionId] : null;

        const answer = condition.questionId === question.id ? choice.id : savedAnswer;

        return condition.expectedChoiceId === answer;
      })
    );

    return `/${conditionMet?.nextQuestionId}`;
  };

  const handleChoiceSelect = (choice: Choice) => () => {
    setSurvey({ ...(survey || {}), [question.id]: choice.id });

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('surveyAnswers', JSON.stringify({ ...(survey || {}), [question.id]: choice.id }));
    }
  };

  const formattedTitle =
    question.dynamicFields && survey
      ? processDynamicText(question.title, question.dynamicFields, survey, questions)
      : question.title;

  return (
    <div className={'flex flex-col w-330 gap-y-7'}>
      <h1 className={'text-2xl font-bold'}>{formattedTitle}</h1>

      {question.subtext && <p>{question.subtext}</p>}

      {question.text && <p>{question.text}</p>}

      <OptionList options={question.choices} onSelect={handleChoiceSelect} getPath={getNextQuestionId} />
    </div>
  );
}
