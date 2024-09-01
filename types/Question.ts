import { Choice } from './Choice';
import { Logic } from './Logic';
import { Theme } from './Theme';
import { DynamicField } from './DynamicField';

export type Question = {
  id: number;
  title: string;
  subtext?: string;
  text?: string;
  slug?: string;
  dynamicFields?: DynamicField[];
  choices: Choice[];
  logic: Logic[];
  nextQuestionId: number | null;
  theme?: Theme;
};
