import { Choice } from './Choice';
import { Theme } from './Theme';
import { DynamicField } from '@/src/types/DynamicField';
import { Condition } from '@/src/types/Condition';

export type Screen = {
  id: string;
  title: string;
  choices: Choice[];
  next: { [choiceId: number]: { screenId: string; condition: Condition }[] | string };
  subtitle?: string;
  text?: string;
  dynamicFields?: DynamicField[];
  theme?: Theme;
};
