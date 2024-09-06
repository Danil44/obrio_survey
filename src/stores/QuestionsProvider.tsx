'use client';

import { Question } from '@/types/Question';
import { create, useStore } from 'zustand';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { devtools } from 'zustand/middleware';

type QuestionsState = {
  questions: Question[];
  currentQuestionId?: string | null;
};

type QuestionsActions = {
  setCurrentQuestionId: (questionId: string) => void;
};

type QuestionsStore = QuestionsState & QuestionsActions;

const createStore = (questions: Question[]) =>
  create<QuestionsStore>()(
    devtools<QuestionsStore>((set) => ({
      questions,
      currentQuestionId: null,

      setCurrentQuestionId(questionId: string) {
        set({ currentQuestionId: questionId });
      },
    }))
  );

const QuestionsContext = createContext<ReturnType<typeof createStore>>(null!);

export const useQuestionsStore = <T,>(selector: (store: QuestionsStore) => T): T => {
  const questionsStoreContext = useContext(QuestionsContext);

  if (!questionsStoreContext) {
    throw new Error('useQuestions() must be used within the QuestionsProvider!');
  }

  return useStore(questionsStoreContext, selector);
};

type QuestionsProviderProps = {
  children: ReactNode;
  questions: Question[];
};

const QuestionsProvider = ({ children, questions }: QuestionsProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createStore>>();
  if (!storeRef.current) {
    storeRef.current = createStore(questions);
  }

  return <QuestionsContext.Provider value={storeRef.current}>{children}</QuestionsContext.Provider>;
};

export const selectQuestionById = (state: QuestionsState) =>
  state.questions.find((question) => question.id === state.currentQuestionId);

export default QuestionsProvider;
