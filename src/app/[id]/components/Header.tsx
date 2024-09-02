'use client';

import Image from 'next/image';
import logoLight from '@/src/app/logo_light.svg';
import logoDark from '@/src/app/logo_dark.svg';
import Link from 'next/link';
import arrowBack from '@/src/app/left_arrow.svg';
import { useCallback, useMemo } from 'react';
import { useSurvey } from '@/src/components/SurveyContext';
import { Screen } from '@/src/types/Screen';

export function Header({
  isDarkTheme,
  screens,
  currentScreenId,
}: {
  isDarkTheme: boolean;
  screens: Screen[];
  currentScreenId: string;
}) {
  const [survey, setSurvey] = useSurvey();

  const previousScreenId = useMemo(() => {
    const previousScreenIds = screens
      .filter((screen) => {
        return Object.values(screen.next).some((value) => {
          if (Array.isArray(value)) {
            return value.find(({ screenId }) => screenId === currentScreenId);
          }

          return value === currentScreenId;
        });
      })
      .map((screen) => screen.id);

    return previousScreenIds.find((screenId) => survey && Boolean(survey[screenId])) || 'gender';
  }, [currentScreenId, screens, survey]);

  const clearCurrentAnswer = useCallback(() => {
    const { [currentScreenId]: value, ...withoutCurrentAnswer } = survey || {};

    setSurvey(withoutCurrentAnswer);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('surveyAnswers', JSON.stringify(withoutCurrentAnswer));
    }
  }, [currentScreenId, survey, setSurvey]);

  return (
    <header className={'py-4 mb-4 container flex justify-center mx-auto relative'}>
      <Link href={`/${previousScreenId}`} onClick={clearCurrentAnswer} className={'absolute left-0'}>
        <Image src={arrowBack} alt={'back button'} className={`dark:invert`} />
      </Link>
      <Image
        src={isDarkTheme ? logoLight : logoDark}
        alt={'logo'}
        width={15}
        height={16}
        className="h-auto filter brightness-100"
      />
    </header>
  );
}
