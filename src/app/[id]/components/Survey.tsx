'use client';

import Link from 'next/link';
import { Question } from '@/types/Question';
import { useSurvey } from '@/app/hooks/useSurvey';
import { useQuestionsNavigation } from '@/app/hooks/useQuestionsNavigation';
import { useEffect } from 'react';
import { useQuestionsStore } from '@/stores/QuestionsProvider';

type Props = {
  currentQuestion: Question;
  questionList: Question[];
};

export function Survey({ currentQuestion }: Props) {
  const { selectChoice, checkIsChoiceActive, title } = useSurvey();
  const { currentQuestionId, setCurrentQuestionId } = useQuestionsStore((state) => state);

  const { getNextQuestionPath } = useQuestionsNavigation();

  useEffect(() => {
    if (!currentQuestionId || currentQuestionId !== currentQuestion.id) {
      setCurrentQuestionId(currentQuestion.id);
    }
  }, [currentQuestionId, setCurrentQuestionId, currentQuestion.id]);

  return (
    <div className={'flex flex-col w-330 gap-y-7'}>
      <h1 className={'text-2xl font-bold text-typography dark:text-light dark:text-center'}>{title}</h1>

      {currentQuestion.subtitle && (
        <p className={'text-lg font-bold text-typography dark:text-light text-center'}>{currentQuestion.subtitle}</p>
      )}

      {currentQuestion.text && (
        <p className={'text-typography font-normal text-sm dark:text-light dark:text-center leading-loose'}>
          {currentQuestion.text}
        </p>
      )}

      <ul className={'flex flex-col gap-y-5 pb-6'}>
        {currentQuestion.choices.map((choice) => {
          const isActive = checkIsChoiceActive(choice);

          return (
            <li key={choice.id} className={'contents'}>
              <Link
                href={getNextQuestionPath(choice)}
                onClick={selectChoice(choice)}
                className={`${isActive ? 'bg-gradient text-light' : ''} bg-secondary rounded-2xl text-center text-buttons text-sm py-5 px-4 drop-shadow-md dark:text-purple hover:bg-gradient hover:text-light dark:hover:bg-none`}
              >
                {choice.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
