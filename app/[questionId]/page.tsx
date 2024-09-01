import surveyConfig from '@/app/surveyConfig';
import { Question } from './components/Question';
import Image from 'next/image';
import React from 'react';
import logo from '../logo.svg';

export function generateStaticParams() {
  console.log(
    surveyConfig.questions.map((question) => ({
      params: { questionId: question.id },
    }))
  );
  return surveyConfig.questions.map((question) => ({
    questionId: question.id.toString(),
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
        <Image src={logo} alt={'logo'} width={15} height={16} className="w-full h-auto" />
      </header>
      <Question question={question} questions={surveyConfig.questions} />
    </div>
  );
}
