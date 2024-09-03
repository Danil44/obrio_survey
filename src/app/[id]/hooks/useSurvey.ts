import { Choice } from '@/src/types/Choice';
import { Answers, useAnswers } from '@/src/store/answers';
import { Question } from '@/src/types/Question';
import { useCallback, useMemo } from 'react';
import { parseStringTemplate } from '@/src/utils/parseStringTemplate';
import { getDynamicFieldValue } from '@/src/utils/getDynamicFieldValue';

function removeCurrentAnswer(survey: Answers, currentQuestionId: string) {
  const { [currentQuestionId]: _, ...withoutCurrentAnswer } = survey;
  return withoutCurrentAnswer;
}

export const useSurvey = (currentQuestion: Question, questionList: Question[]) => {
  const { answers, updateAnswers } = useAnswers();

  const selectChoice = (choice: Choice) => () => {
    updateAnswers({ ...answers, [currentQuestion.id]: choice.id });
  };

  const checkIsChoiceActive = (choice: Choice) => {
    return Boolean(answers && currentQuestion.choices.length > 1 && answers[currentQuestion.id] === choice.id);
  };

  const clearCurrentAnswer = useCallback(() => {
    updateAnswers(removeCurrentAnswer(answers, currentQuestion.id));
  }, [currentQuestion.id, answers, updateAnswers]);

  const title = useMemo(
    () =>
      parseStringTemplate(currentQuestion.title, (key: string) =>
        getDynamicFieldValue(key, currentQuestion, questionList, answers)
      ),
    [currentQuestion, answers, questionList]
  );

  return { title, selectChoice, checkIsChoiceActive, clearCurrentAnswer };
};
