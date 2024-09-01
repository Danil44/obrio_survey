import { Question } from '@/types/Question';

export type SurveyConfig = {
  questions: Question[];
};

const surveyConfig: SurveyConfig = {
  questions: [
    {
      id: 1,
      nextQuestionId: 2,
      slug: 'gender',
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
      logic: [],
    },
    {
      id: 2,
      nextQuestionId: null,
      choices: [
        {
          id: 1,
          title: 'Single',
        },
        {
          id: 2,
          title: 'In a relationship',
        },
      ],
      title: 'So we can get to know you better, tell us about your relationship status.',
      logic: [
        {
          conditions: [
            {
              expectedChoiceId: 1,
              questionId: 2,
            },
          ],
          nextQuestionId: 3,
        },
        {
          conditions: [
            {
              expectedChoiceId: 2,
              questionId: 2,
            },
          ],
          nextQuestionId: 4,
        },
      ],
    },
    {
      id: 3,
      nextQuestionId: 4,
      choices: [
        {
          id: 1,
          title: 'Yes',
        },
        {
          id: 2,
          title: 'No',
        },
      ],
      title: 'Are you a single parent?',
      logic: [],
    },
    {
      id: 4,
      nextQuestionId: 5,
      choices: [
        {
          id: 1,
          title: 'I’m very unhappy with how things are going in my relationship',
        },
        {
          id: 2,
          title: 'I’m unhappy with parts of my relationship, but some things are working well',
        },
        {
          id: 3,
          title: 'I’m generally happy in my relationship',
        },
      ],
      title:
        '{gender} {who have children (if have children)} need a slightly different approach to improve their relationship. Which statement best describes you?',
      dynamicFields: ['gender'],
      logic: [],
    },
    {
      id: 5,
      nextQuestionId: 6,
      choices: [
        {
          id: 1,
          title: 'Yes',
        },
        {
          id: 2,
          title: 'No',
        },
      ],
      title: 'Do you tend to overthink?',
      logic: [],
    },
    {
      id: 6,
      nextQuestionId: null,
      choices: [
        {
          id: 1,
          title: 'Next',
        },
      ],
      title: 'So how does it work?',
      text: 'We analyze hundreds of data points to create your unique astrological blueprint. This is combined with AI to tailor-make your astrological insights, based on your answers. We’re going to change your relationship with astrology.',
      logic: [
        {
          nextQuestionId: 7,
          conditions: [
            {
              questionId: 5,
              expectedChoiceId: 1,
            },
          ],
        },
        {
          nextQuestionId: 8,
          conditions: [
            {
              questionId: 5,
              expectedChoiceId: 2,
            },
          ],
        },
      ],
    },
    {
      id: 7,
      nextQuestionId: 15,
      choices: [
        {
          id: 1,
          title: 'Success',
        },
        {
          id: 2,
          title: 'Romance',
        },
        {
          id: 3,
          title: 'Stability',
        },
        {
          id: 4,
          title: 'Freedom',
        },
      ],
      title: 'What is most important to you?',
      logic: [],
    },
    {
      id: 8,
      nextQuestionId: 15,
      choices: [
        {
          id: 1,
          title: 'Yes',
        },
        {
          id: 2,
          title: 'Sometimes',
        },
        {
          id: 3,
          title: 'Rarely',
        },
        {
          id: 4,
          title: 'Not at all',
        },
      ],
      title: 'Is emotional control tricky for you?',
      logic: [],
    },

    {
      id: 9,
      nextQuestionId: 10,
      choices: [
        {
          id: 1,
          title: 'Yes',
        },
        {
          id: 2,
          title: 'No',
        },
      ],
      title: 'Are you a parent?',
      logic: [],
    },
    {
      id: 10,
      nextQuestionId: 11,
      choices: [
        {
          id: 1,
          title: 'I was unhappy with low things were going in my relationship',
        },
        {
          id: 2,
          title: 'I was unhappy with parts of my relationship, but some thing were working',
        },
        {
          id: 3,
          title: 'I was generally happy with my relationship',
        },
        {
          id: 4,
          title: 'I’ve never been in a relationship',
        },
      ],
      title:
        'Single {gender} {who have children (if have children)} need a slightly different approach to find their perfect partner. But first, how did you feel in your last relationship?',
      dynamicFields: ['gender'],
      logic: [],
    },
    {
      id: 11,
      nextQuestionId: 12,
      choices: [
        {
          id: 1,
          title: 'Introvert',
        },
        {
          id: 2,
          title: 'Extrovert',
        },
        {
          id: 3,
          title: 'A bit of both',
        },
      ],
      title: 'Is your partner an introvert or extrovert?',
      logic: [],
    },
    {
      id: 12,
      nextQuestionId: 13,
      choices: [
        {
          id: 1,
          title: 'Male',
        },
        {
          id: 2,
          title: 'Female',
        },
      ],
      title: 'What is your partner’s gender?',
      logic: [],
    },
    {
      id: 13,
      nextQuestionId: 14,
      choices: [
        {
          id: 1,
          title: 'Strongly agree',
        },
        {
          id: 2,
          title: 'Agree',
        },
        {
          id: 3,
          title: 'Neutral',
        },
        {
          id: 4,
          title: 'Disagree',
        },
        {
          id: 5,
          title: 'Strongly disagree',
        },
      ],
      title: 'Do you agree with the statement below?',
      text: 'My partner and I make sex a priority in our relationship',
      logic: [],
    },
    {
      id: 14,
      nextQuestionId: 15,
      choices: [
        {
          id: 1,
          title: 'Optimistic! They are totally doable, with some guidance.',
        },
        {
          id: 2,
          title: 'Cautious. I’ve struggled before, but I’m hopeful.',
        },
        {
          id: 3,
          title: 'I’m feeling a little anxious, honestly.',
        },
      ],
      title: 'When you think about your relationship goals, you feel...?',
      logic: [],
    },

    {
      id: 15,
      nextQuestionId: null,
      choices: [
        {
          id: 1,
          title: 'Poster or Billboard',
        },
        {
          id: 2,
          title: 'Friend or Family',
        },
        {
          id: 3,
          title: 'Instagram',
        },
        {
          id: 4,
          title: 'Direct Mail or Package Insert',
        },
        {
          id: 5,
          title: 'Online TV or Streaming TV',
        },
        {
          id: 6,
          title: 'TV',
        },
        {
          id: 7,
          title: 'Radio',
        },
        {
          id: 8,
          title: 'Search Engine (Google, Bing, etc.)',
        },
        {
          id: 9,
          title: 'Newspaper or Magazine',
        },
        {
          id: 10,
          title: 'Facebook',
        },
        {
          id: 11,
          title: 'Blog Post or Website Review',
        },
        {
          id: 12,
          title: 'Podcast',
        },
        {
          id: 13,
          title: 'Influencer',
        },
        {
          id: 14,
          title: 'Youtube',
        },
        {
          id: 15,
          title: 'Pinterest',
        },
        {
          id: 16,
          title: 'Other',
        },
      ],
      title: 'Where did you hear about us?',
      logic: [],
    },
  ],
};

export default surveyConfig;
