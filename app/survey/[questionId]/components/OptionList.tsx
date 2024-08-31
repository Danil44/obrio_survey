'use client';
import { Choice } from '@/app/types/Choice';
import Link from 'next/link';
import { useSurvey } from '@/app/components/SurveyContext';
import { Question } from '@/app/types/Question';

export function OptionList({ question }: { question: Question }) {
  const [survey, setSurvey] = useSurvey();
  console.log(survey);
  const getNextQuestionId = (choice: Choice) => {
    if (question.nextQuestionId) {
      return `/survey/${question.nextQuestionId}`;
    }

    const conditionMet = question.logic.find((logic) =>
      logic.conditions.every((condition) => {
        const savedAnswer = survey ? survey[condition.questionId] : null;

        const answer = condition.questionId === question.id ? choice.id : savedAnswer;

        return condition.expectedChoiceId === answer;
      })
    );

    return `/survey/${conditionMet?.nextQuestionId}`;
  };

  const handleChoiceSelect = (choice: Choice) => () => {
    setSurvey({ ...survey, [question.id]: choice.id });
  };

  return (
    <ul>
      {question.choices.map((choice) => (
        <Link key={choice.id} href={getNextQuestionId(choice)} onClick={handleChoiceSelect(choice)}>
          {choice.title}
        </Link>
      ))}
    </ul>
  );
}
