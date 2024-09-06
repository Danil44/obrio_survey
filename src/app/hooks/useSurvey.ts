import { useCallback, useMemo } from 'react';
import { selectQuestionById, useQuestionsStore } from '@/stores/questions';
import { Choice } from '@/types/Choice';
import { parseStringTemplate } from '@/utils/parseStringTemplate';
import { getDynamicFieldValue } from '@/utils/getDynamicFieldValue';
import { useAnswersStore } from '@/stores/answers';

export const useSurvey = () => {
  const { questions, currentQuestion } = useQuestionsStore((state) => ({
    ...state,
    currentQuestion: selectQuestionById(state),
  }));

  const { answers, setAnswers, clearAnswerById } = useAnswersStore((state) => state);

  const selectChoice = (choice: Choice) => {
    if (currentQuestion?.id) {
      setAnswers({ ...answers, [currentQuestion.id]: choice.id });
    }
  };

  const checkIsChoiceActive = (choice: Choice) => {
    return Boolean(
      currentQuestion && answers && currentQuestion.choices.length > 1 && answers[currentQuestion.id] === choice.id
    );
  };

  const clearCurrentAnswer = useCallback(() => {
    if (currentQuestion) {
      clearAnswerById(currentQuestion?.id);
    }
  }, [clearAnswerById, currentQuestion]);

  const title = useMemo(() => {
    if (currentQuestion) {
      return parseStringTemplate(currentQuestion?.title, (key: string) =>
        getDynamicFieldValue(key, currentQuestion, questions, answers)
      );
    }
  }, [currentQuestion, answers, questions]);

  return { title, selectChoice, checkIsChoiceActive, clearCurrentAnswer };
};
