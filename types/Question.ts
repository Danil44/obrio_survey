import { Choice } from '@/types/Choice';
import { Logic } from '@/types/Logic';
import { Theme } from '@/types/Theme';

export type Question = {
  id: number;
  title: string;
  subtext?: string;
  text?: string;
  slug?: string;
  dynamicFields?: string[];
  choices: Choice[];
  logic: Logic[];
  nextQuestionId: number | null;
  theme?: Theme;
};
