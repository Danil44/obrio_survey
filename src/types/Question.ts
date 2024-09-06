import { Choice } from './Choice';
import { Theme } from './Theme';
import { DynamicField } from './DynamicField';
import { Condition } from './Condition';

export type Question = {
  id: string;
  title: string;
  choices: Choice[];
  next: { [choiceId: number]: { questionId: string; condition: Condition }[] | string };
  subtitle?: string;
  text?: string;
  dynamicFields?: DynamicField[];
  theme?: Theme;
};
