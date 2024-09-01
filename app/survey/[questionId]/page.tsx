import surveyConfig from '@/app/surveyConfig';
import { Question } from '@/app/survey/[questionId]/components/Question';
import Image from 'next/image';
import React from 'react';
import logo from '../../logo.svg';

export function generateStaticParams() {
  return surveyConfig.questions.map((question) => ({
    params: { questionId: question.id },
  }));
}

export default function Page({ params }: { params: { questionId: string } }) {
  const question = surveyConfig.questions.find((question) => question.id === Number(params.questionId));

  if (!question) {
    return null;
  }

  return (
    <div className="bg-primary min-h-screen flex flex-col w-full items-center">
      <header className={'py-4 mb-4'}>
        <Image src={logo} alt={'logo'} width={15} height={16} />
      </header>
      <Question question={question} questions={surveyConfig.questions} />
    </div>
  );
}
