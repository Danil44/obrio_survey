import { Portal } from './Portal';
import { useAnswersStore } from '@/stores/answers';
import { useQuestionsStore } from '@/stores/questions';
import { useMemo } from 'react';
import { parseStringTemplate } from '@/utils/parseStringTemplate';
import { getDynamicFieldValue } from '@/utils/getDynamicFieldValue';

export function ResultsModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  const answers = useAnswersStore((state) => state.answers);
  const questions = useQuestionsStore((state) => state.questions);

  const answersList = useMemo(() => {
    return Object.entries(answers).reduce<{ [key: string]: string }>((acc, [key, value]) => {
      const question = questions.find((question) => question.id === key);
      const answer = question?.choices.find((choice) => choice.id === value)?.title;

      if (!question || !answer) {
        return acc;
      }

      const title = parseStringTemplate(question.title, (key) =>
        getDynamicFieldValue({ key, question, questionList: questions, answers })
      );
      return {
        ...acc,
        [title]: answer,
      };
    }, {});
  }, [answers, questions]);

  return (
    <Portal selector={'resultsModal'} show={show}>
      <div onClick={onClose} className="fixed inset-0 backdrop-brightness-50 grid place-content-center"></div>
      <div
        className={
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-full sm:size-9/12 bg-light p-6 rounded-3xl overflow-y-auto'
        }
      >
        <button onClick={onClose} className={'absolute top-6 right-6 text-2xl'}>
          X
        </button>
        <h2 className={'text-2xl font-bold text-typography dark:text-light mb-6'}>Your answers: </h2>
        <ul>
          {Object.entries(answersList).map(([key, value]) => (
            <li key={key} className={'mb-3.5'}>
              <div>
                Q: <span className={''}>{key}</span>
              </div>{' '}
              A:{' '}
              <span className={'text-lg font-bold text-typography dark:text-light text-center capitalize'}>
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Portal>
  );
}
