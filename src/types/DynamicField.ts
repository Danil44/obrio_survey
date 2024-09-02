import { Condition } from './Condition';

export type DynamicField =
  | {
      field: string;
      type: 'answer';
      screenId: string;
    }
  | {
      field: string;
      type: 'conditional';
      condition: Condition;
    };
