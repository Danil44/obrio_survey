'use client';

import Image from 'next/image';
import logoDark from '@/src/media/logo_dark.svg';
import Link from 'next/link';
import arrowBack from '@/src/media/left_arrow.svg';
import { Question } from '@/src/types/Question';
import { useQuestionsNavigation } from '@/src/app/[id]/hooks/useQuestionsNavigation';
import { useSurvey } from '@/src/app/[id]/hooks/useSurvey';

type Props = {
  questionList: Question[];
  currentQuestion: Question;
};

export function Header({ questionList, currentQuestion }: Props) {
  const { clearCurrentAnswer } = useSurvey(currentQuestion, questionList);

  const { previousQuestionPath } = useQuestionsNavigation({ questionList, currentQuestion });

  return (
    <header className={'py-4 mb-4 w-330 sm:container flex justify-center mx-auto relative'}>
      <Link
        href={previousQuestionPath}
        onClick={clearCurrentAnswer}
        className={'absolute left-0 top-1/2 -translate-y-1/2'}
      >
        <Image src={arrowBack} alt={'back button'} className={`dark:invert`} />
      </Link>
      <Image src={logoDark} alt={'logo'} width={15} height={16} className="h-auto filter brightness-100 dark:invert" />
    </header>
  );
}
