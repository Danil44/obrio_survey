import { Condition } from './Condition';

export type DynamicField =
  | {
      field: string;
      type: 'answer';
      questionId: string;
    }
  | {
      field: string;
      type: 'conditional';
      condition: Condition;
    };
