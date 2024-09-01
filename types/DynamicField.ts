import { Condition } from './Condition';

export type DynamicField<T extends string> = {
  [key in T | string]: Array<
    | {
        field: string;
        type: 'answer';
        screenId: T;
      }
    | {
        field: string;
        type: 'conditional';
        condition: Required<Pick<Condition<T>, 'expectedChoiceId' | 'referringScreenId'>>;
      }
  >;
};
