'use client';

import { selectQuestionById, useQuestionsStore } from '@/stores/questions';
import { ReactNode } from 'react';

export function Theme({ children }: { children: ReactNode }) {
  const currentQuestion = useQuestionsStore(selectQuestionById);

  return <div className={`${currentQuestion?.theme}`}>{children}</div>;
}
