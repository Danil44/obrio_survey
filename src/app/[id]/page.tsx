import { Survey } from './components/Survey';
import React from 'react';
import { redirect } from 'next/navigation';
import surveyConfig from '@/surveyConfig';

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

  return <Survey currentQuestion={question} questionList={surveyConfig.questions} />;
}
