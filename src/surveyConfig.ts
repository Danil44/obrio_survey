import { Question } from '@/src/types/Question';

type SurveyConfig = {
  questions: Question[];
};

const surveyConfig: SurveyConfig = {
  questions: [
    {
      id: 'gender',
      title: 'Select your gender:',
      choices: [
        { id: 1, title: 'Female' },
        { id: 2, title: 'Male' },
      ],
      next: {
        1: 'relationshipStatus',
        2: 'relationshipStatus',
      },
    },
    {
      id: 'relationshipStatus',
      title: 'So we can get to know you better, tell us about your relationship status.',
      choices: [
        { id: 1, title: 'Single' },
        { id: 2, title: 'In a relationship' },
      ],
      next: {
        1: 'isSingleParent',
        2: 'isParent',
      },
    },
    {
      id: 'isSingleParent',
      title: 'Are you a single parent?',
      choices: [
        { id: 1, title: 'Yes' },
        { id: 2, title: 'No' },
      ],
      next: {
        1: 'relationshipStatement',
        2: 'relationshipStatement',
      },
    },
    {
      id: 'relationshipStatement',
      title:
        '{gender} {who have children} need a slightly different approach to improve their relationship. Which statement best describes you?',
      choices: [
        { id: 1, title: 'I’m very unhappy with how things are going in my relationship' },
        { id: 2, title: 'I’m unhappy with parts of my relationship, but some things are working well' },
        { id: 3, title: 'I’m generally happy in my relationship' },
      ],
      dynamicFields: [
        { field: 'gender', questionId: 'gender', type: 'answer' },
        {
          field: 'who have children',
          type: 'conditional',
          condition: { questionId: 'isSingleParent', expectedChoiceId: 1 },
        },
      ],
      next: {
        1: 'isTendToOverthink',
        2: 'isTendToOverthink',
        3: 'isTendToOverthink',
      },
    },
    {
      id: 'isTendToOverthink',
      title: 'Do you tend to overthink?',
      choices: [
        { id: 1, title: 'Yes' },
        { id: 2, title: 'No' },
      ],
      next: {
        1: 'howDoesItWork',
        2: 'howDoesItWork',
      },
    },
    {
      id: 'howDoesItWork',
      title: 'So how does it work?',
      text: 'We analyze hundreds of data points to create your unique astrological blueprint. This is combined with AI to tailor-make your astrological insights, based on your answers. We’re going to change your relationship with astrology.',
      next: {
        1: [
          {
            questionId: 'whatIsMostImportant',
            condition: { questionId: 'isTendToOverthink', expectedChoiceId: 1 },
          },
          {
            questionId: 'isEmotionalControlTricky',
            condition: { questionId: 'isTendToOverthink', expectedChoiceId: 2 },
          },
        ],
      },
      choices: [
        {
          id: 1,
          title: 'Next',
        },
      ],
      theme: 'dark',
    },
    {
      id: 'whatIsMostImportant',
      title: 'What is most important to you?',
      choices: [
        { id: 1, title: 'Success' },
        { id: 2, title: 'Romance' },
        { id: 3, title: 'Stability' },
        { id: 4, title: 'Freedom' },
      ],
      next: {
        1: 'heardFrom',
        2: 'heardFrom',
        3: 'heardFrom',
        4: 'heardFrom',
      },
    },
    {
      id: 'isEmotionalControlTricky',
      title: 'Is emotional control tricky for you?',
      choices: [
        { id: 1, title: 'Yes' },
        { id: 2, title: 'Sometimes' },
        { id: 3, title: 'Rarely' },
        { id: 4, title: 'Not at all' },
      ],
      next: {
        1: 'heardFrom',
        2: 'heardFrom',
        3: 'heardFrom',
        4: 'heardFrom',
      },
    },
    {
      id: 'isParent',
      title: 'Are you a parent?',
      choices: [
        { id: 1, title: 'Yes' },
        { id: 2, title: 'No' },
      ],
      next: {
        1: 'lastRelationship',
        2: 'lastRelationship',
      },
    },
    {
      id: 'lastRelationship',
      title:
        'Single {gender} {who have children} need a slightly different approach to find their perfect partner. But first, how did you feel in your last relationship?',
      choices: [
        { id: 1, title: 'I was unhappy with how things were going in my relationship' },
        { id: 2, title: 'I was unhappy with parts of my relationship, but some things were working' },
        { id: 3, title: 'I was generally happy with my relationship' },
        { id: 4, title: 'I’ve never been in a relationship' },
      ],
      dynamicFields: [
        { field: 'gender', questionId: 'gender', type: 'answer' },
        {
          field: 'who have children',
          type: 'conditional',
          condition: { questionId: 'isParent', expectedChoiceId: 1 },
        },
      ],
      next: {
        1: 'partnerPersonality',
        2: 'partnerPersonality',
        3: 'partnerPersonality',
        4: 'partnerPersonality',
      },
    },
    {
      id: 'partnerPersonality',
      title: 'Is your partner an introvert or extrovert?',
      choices: [
        { id: 1, title: 'Introvert' },
        { id: 2, title: 'Extrovert' },
        { id: 3, title: 'A bit of both' },
      ],
      next: {
        1: 'partnerGender',
        2: 'partnerGender',
        3: 'partnerGender',
      },
    },
    {
      id: 'partnerGender',
      title: 'What is your partner’s gender?',
      choices: [
        { id: 1, title: 'Male' },
        { id: 2, title: 'Female' },
      ],
      next: {
        1: 'sexPriority',
        2: 'sexPriority',
      },
    },
    {
      id: 'sexPriority',
      title: 'Do you agree with the statement below?',
      subtitle: '"My partner and I make sex a priority in our relationship"',
      choices: [
        { id: 1, title: 'Strongly agree' },
        { id: 2, title: 'Agree' },
        { id: 3, title: 'Neutral' },
        { id: 4, title: 'Disagree' },
        { id: 5, title: 'Strongly disagree' },
      ],
      next: {
        1: 'relationshipGoals',
        2: 'relationshipGoals',
        3: 'relationshipGoals',
        4: 'relationshipGoals',
        5: 'relationshipGoals',
      },
    },
    {
      id: 'relationshipGoals',
      title: 'When you think about your relationship goals, you feel...?',
      choices: [
        { id: 1, title: 'Optimistic! They are totally doable, with some guidance.' },
        { id: 2, title: 'Cautious. I’ve struggled before, but I’m hopeful.' },
        { id: 3, title: 'I’m feeling a little anxious, honestly.' },
      ],
      next: {
        1: 'heardFrom',
        2: 'heardFrom',
        3: 'heardFrom',
      },
    },
    {
      id: 'heardFrom',
      title: 'Where did you hear about us?',
      choices: [
        { id: 1, title: 'Poster or Billboard' },
        { id: 2, title: 'Friend or Family' },
        { id: 3, title: 'Instagram' },
        { id: 4, title: 'Direct Mail or Package Insert' },
        { id: 5, title: 'Online TV or Streaming TV' },
        { id: 6, title: 'TV' },
        { id: 7, title: 'Radio' },
        { id: 8, title: 'Search Engine (Google, Bing, etc.)' },
        { id: 9, title: 'Newspaper or Magazine' },
        { id: 10, title: 'Facebook' },
        { id: 11, title: 'Blog Post or Website Review' },
        { id: 12, title: 'Podcast' },
        { id: 13, title: 'Influencer' },
        { id: 14, title: 'YouTube' },
        { id: 15, title: 'Pinterest' },
        { id: 16, title: 'Snapchat' },
        { id: 17, title: 'Twitter' },
        { id: 18, title: 'Other' },
      ],
      next: {},
    },
  ],
};

export default surveyConfig;
