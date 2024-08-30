import { Question } from '@/app/types/Question';

export type SurveyConfig = {
  questions: Question[];
};

const surveyConfig: SurveyConfig = {
  questions: [
    {
      id: 1,
      nextQuestionId: 2,
      choices: [
        {
          id: 1,
          title: 'Female',
        },
        {
          id: 2,
          title: 'Male',
        },
      ],
      title: 'Select your gender:',
      conditions: [],
    },
  ],
};

export default surveyConfig;
