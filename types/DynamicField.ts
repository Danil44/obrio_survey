import { Condition } from './Condition';

export type DynamicField =
  | {
      field: string;
      type: 'answer';
      questionId: number;
    }
  | {
      field: string;
      type: 'conditional';
      condition: Condition;
    };
