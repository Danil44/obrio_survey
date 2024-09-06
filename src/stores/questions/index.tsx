import { createContext, ReactNode, useContext, useRef } from 'react';
import { Question } from '@/types/Question';
import { useStore } from 'zustand';
import { createQuestionsStore, QuestionsState, QuestionsStore } from './questionsStore';

type QuestionsProviderProps = {
  children: ReactNode;
  questions: Question[];
};

const QuestionsContext = createContext<ReturnType<typeof createQuestionsStore>>(null!);

export const useQuestionsStore = <T,>(selector: (store: QuestionsStore) => T): T => {
  const questionsStoreContext = useContext(QuestionsContext);

  if (!questionsStoreContext) {
    throw new Error('useQuestions() must be used within the QuestionsProvider!');
  }

  return useStore(questionsStoreContext, selector);
};

const QuestionsProvider = ({ children, questions }: QuestionsProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createQuestionsStore>>();
  if (!storeRef.current) {
    storeRef.current = createQuestionsStore(questions);
  }

  return <QuestionsContext.Provider value={storeRef.current}>{children}</QuestionsContext.Provider>;
};

export const selectQuestionById = (state: QuestionsState) =>
  state.questions.find((question) => question.id === state.currentQuestionId);

export default QuestionsProvider;
