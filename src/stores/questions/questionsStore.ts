'use client';

import { Question } from '@/types/Question';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type QuestionsState = {
  questions: Question[];
  currentQuestionId?: string | null;
};

type QuestionsActions = {
  setCurrentQuestionId: (questionId: string) => void;
};

export type QuestionsStore = QuestionsState & QuestionsActions;

export const createQuestionsStore = (questions: Question[]) =>
  create<QuestionsStore>()(
    devtools<QuestionsStore>((set) => ({
      questions,
      currentQuestionId: null,

      setCurrentQuestionId(questionId: string) {
        set({ currentQuestionId: questionId });
      },
    }))
  );
