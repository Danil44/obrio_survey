'use client';
import React, { createContext, useState } from 'react';

const useSurveyState = (initialState: { [key: number]: number }) =>
  useState<{
    [key: number]: number;
  } | null>(initialState);

export const SurveyContext = createContext<ReturnType<typeof useSurveyState> | null>(null);

export const useSurvey = () => {
  const survey = React.useContext(SurveyContext);

  if (!survey) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }

  return survey;
};

const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const surveyAnswersFromLS = localStorage.getItem('surveyAnswers');
  const storedAnswers = surveyAnswersFromLS ? JSON.parse(surveyAnswersFromLS) : null;

  const [survey, setSurvey] = useSurveyState(storedAnswers);

  return <SurveyContext.Provider value={[survey, setSurvey]}>{children}</SurveyContext.Provider>;
};

export default SurveyProvider;
