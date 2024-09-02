'use client';

import { OptionList } from '../OptionList';
import type { Screen } from '@/src/types/Screen';
import { useScreen } from '@/src/app/[id]/components/Screen/useScreen';
import { useScreensNavigation } from '@/src/app/[id]/useScreensNavigation';

export function Screen({ screen, screens }: { screen: Screen; screens: Screen[] }) {
  const { selectChoice, checkIsOptionActive, title } = useScreen(screen, screens);
  
  const { getNextScreenId } = useScreensNavigation({ screens, currentScreen: screen });

  return (
    <div className={'flex flex-col w-330 gap-y-7'}>
      <h1 className={'text-2xl font-bold text-typography dark:text-light dark:text-center'}>{title}</h1>

      {screen.subtitle && (
        <p className={'text-lg font-bold text-typography dark:text-light dark:text-center'}>{screen.subtitle}</p>
      )}

      {screen.text && (
        <p className={'text-typography font-normal text-sm dark:text-light dark:text-center leading-loose'}>
          {screen.text}
        </p>
      )}

      <OptionList
        options={screen.choices}
        onSelect={selectChoice}
        getPath={getNextScreenId}
        checkIsActive={checkIsOptionActive}
      />
    </div>
  );
}
