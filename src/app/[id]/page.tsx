import screensConfig from '@/src/screensConfig';
import { ScreenView } from './components/ScreenView';
import React from 'react';
import { Header } from '@/src/app/[id]/components/Header';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return screensConfig.screens.map((screen) => ({
    id: screen.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const screen = screensConfig.screens.find((screen) => screen.id === params.id);

  if (!screen) {
    return redirect(`/${screensConfig.screens[0].id}`);
  }

  const isDarkTheme = screen.theme === 'dark';

  return (
    <div className={`${isDarkTheme ? 'dark' : ''}`}>
      <div className={'bg-primary dark:bg-gradient min-h-screen flex flex-col w-full items-center'}>
        <Header screens={screensConfig.screens} currentScreen={screen} />

        <ScreenView currentScreen={screen} screens={screensConfig.screens} />
      </div>
    </div>
  );
}
