import surveyConfig from '@/app/surveyConfig';
import { Screen } from './components/Screen';
import Image from 'next/image';
import React from 'react';
import logo from '../logo.svg';

export function generateStaticParams() {
  return surveyConfig.screens.map((screen) => ({
    path: screen.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const screen = surveyConfig.screens.find((screen) => screen.id === params.id);

  if (!screen) {
    return null;
  }

  return (
    <div className="bg-primary min-h-screen flex flex-col w-full items-center">
      <header className={'py-4 mb-4'}>
        <Image src={logo} alt={'logo'} width={15} height={16} className="w-full h-auto" />
      </header>
      <Screen
        screen={screen}
        screens={surveyConfig.screens}
        logic={surveyConfig.logic}
        dynamicFields={surveyConfig.dynamicFields}
      />
    </div>
  );
}
