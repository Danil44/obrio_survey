'use client';

import type { Screen } from '@/src/types/Screen';
import { useScreen } from '@/src/app/[id]/hooks/useScreen';
import { useScreensNavigation } from '@/src/app/[id]/hooks/useScreensNavigation';
import Link from 'next/link';

export function ScreenView({ currentScreen, screens }: { currentScreen: Screen; screens: Screen[] }) {
  const { selectChoice, checkIsOptionActive, title } = useScreen(currentScreen, screens);

  const { getNextScreenId } = useScreensNavigation({ screens, currentScreen });

  return (
    <div className={'flex flex-col w-330 gap-y-7'}>
      <h1 className={'text-2xl font-bold text-typography dark:text-light dark:text-center'}>{title}</h1>

      {currentScreen.subtitle && (
        <p className={'text-lg font-bold text-typography dark:text-light dark:text-center'}>{currentScreen.subtitle}</p>
      )}

      {currentScreen.text && (
        <p className={'text-typography font-normal text-sm dark:text-light dark:text-center leading-loose'}>
          {currentScreen.text}
        </p>
      )}

      <ul className={'flex flex-col gap-y-5 pb-6'}>
        {currentScreen.choices.map((choice) => {
          const isActive = checkIsOptionActive(choice);
          return (
            <li key={choice.id} className={'contents'}>
              <Link
                href={getNextScreenId(choice)}
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
