import { Screen } from '@/types/Screen';
import { Logic } from '@/types/Logic';
import { DynamicField } from '@/types/DynamicField';

export type ScreenId = (typeof screens)[number]['id'];

export type SurveyConfig = {
  screens: Screen[];
  logic: Array<Partial<Logic<(typeof screens)[number]['id']>>>;
  dynamicFields: Partial<DynamicField<ScreenId>>;
};

const logic: SurveyConfig['logic'] = [
  {
    explicitNextId: 'relationshipStatus',
    referringId: 'gender',
  },
  {
    conditions: [
      {
        expectedChoiceId: 1,
        nextScreenId: 'isSingleParent',
      },
      {
        expectedChoiceId: 2,
        nextScreenId: 'isParent',
      },
    ],
    explicitNextId: null,
    referringId: 'relationshipStatus',
  },
  {
    explicitNextId: 'relationshipStatement',
    referringId: 'isSingleParent',
  },
  {
    explicitNextId: 'lastRelationship',
    referringId: 'isParent',
  },
  {
    explicitNextId: 'isTendToOverthink',
    referringId: 'relationshipStatement',
  },
  {
    explicitNextId: 'howDoesItWork',
    referringId: 'isTendToOverthink',
  },
  {
    conditions: [
      {
        referringScreenId: 'isTendToOverthink',
        expectedChoiceId: 1,
        nextScreenId: 'whatIsMostImportant',
      },
      {
        referringScreenId: 'isTendToOverthink',
        expectedChoiceId: 2,
        nextScreenId: 'isEmotionalControlTricky',
      },
    ],
    explicitNextId: null,
    referringId: 'howDoesItWork',
  },
  {
    explicitNextId: 'heardFrom',
    referringId: 'whatIsMostImportant',
  },
  {
    explicitNextId: 'heardFrom',
    referringId: 'isEmotionalControlTricky',
  },

  {
    explicitNextId: 'lastRelationship',
    referringId: 'isParent',
  },
  {
    explicitNextId: 'partnerPersonality',
    referringId: 'lastRelationship',
  },
  {
    explicitNextId: 'partnerGender',
    referringId: 'partnerPersonality',
  },
  {
    explicitNextId: 'sexPriority',
    referringId: 'partnerGender',
  },
  {
    explicitNextId: 'relationshipGoals',
    referringId: 'sexPriority',
  },
  {
    explicitNextId: 'heardFrom',
    referringId: 'relationshipGoals',
  },
];

const dynamicFields: SurveyConfig['dynamicFields'] = {
  relationshipStatement: [
    { field: 'gender', screenId: 'gender', type: 'answer' },
    {
      field: 'who have children',
      type: 'conditional',
      condition: { referringScreenId: 'isSingleParent', expectedChoiceId: 1 },
    },
  ],

  lastRelationship: [
    { field: 'gender', screenId: 'gender', type: 'answer' },
    {
      field: 'who have children',
      type: 'conditional',
      condition: { referringScreenId: 'isParent', expectedChoiceId: 1 },
    },
  ],
};

const screens = [
  {
    id: 'gender',
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
  },
  {
    id: 'relationshipStatus',
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
  },
  {
    id: 'isSingleParent',
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
  },
  {
    id: 'relationshipStatement',
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
      '{gender} {who have children} need a slightly different approach to improve their relationship. Which statement best describes you?',
  },
  {
    id: 'isTendToOverthink',
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
  },
  {
    id: 'howDoesItWork',
    choices: [
      {
        id: 1,
        title: 'Next',
      },
    ],
    title: 'So how does it work?',
    text: 'We analyze hundreds of data points to create your unique astrological blueprint. This is combined with AI to tailor-make your astrological insights, based on your answers. We’re going to change your relationship with astrology.',
  },
  {
    id: 'whatIsMostImportant',
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
  },
  {
    id: 'isEmotionalControlTricky',
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
  },

  {
    id: 'isParent',
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
  },
  {
    id: 'lastRelationship',
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
      'Single {gender} {who have children} need a slightly different approach to find their perfect partner. But first, how did you feel in your last relationship?',
  },
  {
    id: 'partnerPersonality',
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
  },
  {
    id: 'partnerGender',
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
  },
  {
    id: 'sexPriority',
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
  },
  {
    id: 'relationshipGoals',
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
  },

  {
    id: 'heardFrom',
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
  },
] as const satisfies SurveyConfig['screens'];

const surveyConfig: SurveyConfig = {
  screens,
  logic,
  dynamicFields,
};

export default surveyConfig;
