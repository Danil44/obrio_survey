'use client';

import Image from 'next/image';
import logoDark from '@/src/media/logo_dark.svg';
import Link from 'next/link';
import arrowBack from '@/src/media/left_arrow.svg';
import { Screen } from '@/src/types/Screen';
import { useScreensNavigation } from '@/src/app/[id]/useScreensNavigation';

export function Header({ screens, currentScreen }: { screens: Screen[]; currentScreen: Screen }) {
  const { previousScreenId, clearCurrentAnswer } = useScreensNavigation({ screens, currentScreen });

  return (
    <header className={'py-4 mb-4 w-330 sm:container flex justify-center mx-auto relative'}>
      <Link
        href={`/${previousScreenId}`}
        onClick={clearCurrentAnswer}
        className={'absolute left-0 top-1/2 -translate-y-1/2'}
      >
        <Image src={arrowBack} alt={'back button'} className={`dark:invert`} />
      </Link>
      <Image src={logoDark} alt={'logo'} width={15} height={16} className="h-auto filter brightness-100 dark:invert" />
    </header>
  );
}
