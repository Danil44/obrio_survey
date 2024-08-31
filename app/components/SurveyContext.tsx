'use client';
import React, { createContext, useState } from 'react';

const useSurveyState = () => useState<{ [key: number]: number } | null>(null);

export const SurveyContext = createContext<ReturnType<typeof useSurveyState> | null>(null);

export const useSurvey = () => {
  const survey = React.useContext(SurveyContext);

  if (!survey) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }

  return survey;
};

const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const [survey, setSurvey] = useSurveyState();

  return <SurveyContext.Provider value={[survey, setSurvey]}>{children}</SurveyContext.Provider>;
};

export default SurveyProvider;
