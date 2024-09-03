import surveyConfig from '@/src/surveyConfig';
import { Survey } from './components/Survey';
import React from 'react';
import { Header } from '@/src/app/[id]/components/Header';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return surveyConfig.questions.map((question) => ({
    id: question.id,
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  const question = surveyConfig.questions.find((question) => question.id === params.id);

  if (!question) {
    return redirect(`/${surveyConfig.questions[0].id}`);
  }

  const isDarkTheme = question.theme === 'dark';

  return (
    <div className={`${isDarkTheme ? 'dark' : ''}`}>
      <div className={'bg-primary dark:bg-gradient min-h-screen flex flex-col w-full items-center'}>
        <Header questionList={surveyConfig.questions} currentQuestion={question} />

        <Survey currentQuestion={question} questionList={surveyConfig.questions} />
      </div>
    </div>
  );
}
