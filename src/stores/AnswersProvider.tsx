'use client';

import { create, useStore } from 'zustand';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { createJSONStorage, persist } from 'zustand/middleware';

type Answer = {
  [key: string]: number;
};

type AnswersStore = {
  answers: Answer;

  setAnswers: (answers: Answer) => void;
  clearAnswerById: (id: string) => void;
};

const createStore = () =>
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

const AnswersContext = createContext<ReturnType<typeof createStore>>(null!);

export const useAnswersStore = <T,>(selector: (store: AnswersStore) => T): T => {
  const answersStoreContext = useContext(AnswersContext);

  if (!AnswersContext) {
    throw new Error('useAnswersStore() must be used within the QuestionsProvider!');
  }

  return useStore(answersStoreContext, selector);
};

export const AnswersStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof createStore>>();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  return <AnswersContext.Provider value={storeRef.current}>{children}</AnswersContext.Provider>;
};

export default AnswersStoreProvider;
