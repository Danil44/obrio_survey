'use client';

import { OptionList } from './OptionList';
import type { Question } from '@/types/Question';
import { useSurvey } from '@/components/SurveyContext';
import type { Choice } from '@/types/Choice';

function replaceDynamicFields(text: string, answers: { [key: string]: string }): string {
  return text.replace(/{(.*?)}/g, (_, key) => answers[key] || '');
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

  const formattedTitle = replaceDynamicFields(
    question.title,
    questions.reduce((acc, nextQuestion) => {
      if (nextQuestion.slug) {
        return {
          ...acc,
          [nextQuestion.slug]: survey
            ? nextQuestion.choices.find((choice) => choice.id === survey[nextQuestion.id])?.title
            : null,
        };
      }
      return acc;
    }, {})
  );

  return (
    <div className={'flex flex-col w-330 gap-y-7'}>
      <h1 className={'text-2xl font-bold'}>{formattedTitle}</h1>

      {question.subtext && <p>{question.subtext}</p>}

      {question.text && <p>{question.text}</p>}

      <OptionList options={question.choices} onSelect={handleChoiceSelect} getPath={getNextQuestionId} />
    </div>
  );
}
