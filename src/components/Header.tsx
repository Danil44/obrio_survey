'use client';

import Image from 'next/image';
import logo from '/public/logo.svg';
import Link from 'next/link';
import arrowBack from '/public/left_arrow.svg';
import { useSurvey } from '@/app/hooks/useSurvey';
import { useQuestionsNavigation } from '@/app/hooks/useQuestionsNavigation';

export function Header() {
  const { clearCurrentAnswer } = useSurvey();

  const { previousQuestionPath } = useQuestionsNavigation();
  
  return (
    <header className={'py-4 mb-4 w-330 sm:container flex justify-center mx-auto relative'}>
      {previousQuestionPath && (
        <Link
          href={previousQuestionPath}
          onClick={clearCurrentAnswer}
          className={'absolute left-0 top-1/2 -translate-y-1/2'}
        >
          <Image src={arrowBack} alt={'back button'} className={`dark:invert`} />
        </Link>
      )}

      <Image src={logo} alt={'logo'} width={15} height={16} className="h-auto filter brightness-100 dark:invert" />
    </header>
  );
}
