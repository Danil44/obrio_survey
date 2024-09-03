'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';

export type Answers = {
  [key: string]: number;
};

type SurveyContextProps = {
  answers: Answers;
  updateAnswers: (data: { [key: string]: number }) => void;
};

export const SurveyContext = createContext<SurveyContextProps | null>(null);

export const useAnswers = () => {
  const survey = React.useContext(SurveyContext);

  if (!survey) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }

  return survey;
};

const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    if (!answers) {
      const surveyAnswersFromLS = typeof window !== 'undefined' ? window.localStorage.getItem('surveyAnswers') : null;
      const storedAnswers = surveyAnswersFromLS ? JSON.parse(surveyAnswersFromLS) : null;

      setAnswers(storedAnswers);
    }
  }, [answers]);

  const updateAnswers = useCallback((value: { [key: string]: number }) => {
    setAnswers(value);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('surveyAnswers', JSON.stringify(value));
    }
  }, []);

  return <SurveyContext.Provider value={{ answers: answers || {}, updateAnswers }}>{children}</SurveyContext.Provider>;
};

export default SurveyProvider;
