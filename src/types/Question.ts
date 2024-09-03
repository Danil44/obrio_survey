import { Choice } from './Choice';
import { Theme } from './Theme';
import { DynamicField } from '@/src/types/DynamicField';
import { Condition } from '@/src/types/Condition';

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
