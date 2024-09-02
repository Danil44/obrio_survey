'use client';
import React, { createContext, useCallback, useEffect, useState } from 'react';

export type Survey = {
  [key: string]: number;
};

type SurveyContextProps = {
  survey: Survey;
  updateSurvey: (data: { [key: string]: number }) => void;
};

export const SurveyContext = createContext<SurveyContextProps | null>(null);

export const useSurvey = () => {
  const survey = React.useContext(SurveyContext);

  if (!survey) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }

  return survey;
};

const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const [survey, setSurvey] = useState<Survey | null>(null);

  useEffect(() => {
    if (!survey) {
      const surveyAnswersFromLS = typeof window !== 'undefined' ? window.localStorage.getItem('surveyAnswers') : null;
      const storedAnswers = surveyAnswersFromLS ? JSON.parse(surveyAnswersFromLS) : null;

      setSurvey(storedAnswers);
    }
  }, [survey]);

  const updateSurvey = useCallback((value: { [key: string]: number }) => {
    setSurvey(value);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('surveyAnswers', JSON.stringify(value));
    }
  }, []);

  return <SurveyContext.Provider value={{ survey: survey || {}, updateSurvey }}>{children}</SurveyContext.Provider>;
};

export default SurveyProvider;
