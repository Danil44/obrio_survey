'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { AnswersStore, createAnswersStore } from './answersStore';
import { useStore } from 'zustand';

const AnswersContext = createContext<ReturnType<typeof createAnswersStore>>(null!);

export const useAnswersStore = <T,>(selector: (store: AnswersStore) => T): T => {
  const answersStoreContext = useContext(AnswersContext);

  if (!AnswersContext) {
    throw new Error('useAnswersStore() must be used within the QuestionsProvider!');
  }

  return useStore(answersStoreContext, selector);
};

export const AnswersStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<ReturnType<typeof createAnswersStore>>();
  if (!storeRef.current) {
    storeRef.current = createAnswersStore();
  }

  return <AnswersContext.Provider value={storeRef.current}>{children}</AnswersContext.Provider>;
};

export default AnswersStoreProvider;
