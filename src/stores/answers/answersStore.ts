'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Answer = {
  [key: string]: number;
};

export type AnswersStore = {
  answers: Answer;

  setAnswers: (answers: Answer) => void;
  clearAnswerById: (id: string) => void;
};

export const createAnswersStore = () =>
  create<AnswersStore>()(
    persist(
      (set) => ({
        answers: {},

        setAnswers: (answers: Answer) => {
          set({ answers });
        },
        clearAnswerById: (id: string) => set((state) => ({ ...state.answers, [id]: null })),
      }),
      {
        name: 'answers',
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
