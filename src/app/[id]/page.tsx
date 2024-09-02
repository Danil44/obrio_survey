import screensConfig from '@/src/screensConfig';
import { Screen } from './components/Screen';
import React from 'react';
import { Header } from '@/src/app/[id]/components/Header';

export function generateStaticParams() {
  return screensConfig.screens.map((screen) => ({
    id: screen.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const screen = screensConfig.screens.find((screen) => screen.id === params.id);

  if (!screen) {
    return null;
  }

  const isDarkTheme = screen.theme === 'dark';

  return (
    <div className={`${isDarkTheme ? 'dark' : ''}`}>
      <div className={'bg-primary dark:bg-gradient min-h-screen flex flex-col w-full items-center'}>
        <Header screens={screensConfig.screens} currentScreen={screen} />

        <Screen screen={screen} screens={screensConfig.screens} />
      </div>
    </div>
  );
}
