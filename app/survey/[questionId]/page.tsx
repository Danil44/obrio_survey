import surveyConfig from '@/app/surveyConfig';
import { OptionList } from '@/app/survey/[questionId]/components/OptionList';

export function generateStaticParams() {
  return surveyConfig.questions.map((question) => ({
    params: { questionId: question.id },
  }));
}

export default function Page({ params }: { params: { questionId: string } }) {
  const question = surveyConfig.questions.find((question) => question.id === Number(params.questionId));

  if (!question) {
    return null;
  }

  return (
    <div>
      <h1>{question.title}</h1>

      {question.subtext && <b>{question.subtext}</b>}

      {question.text && <p>{question.text}</p>}

      <OptionList question={question} />
    </div>
  );
}
