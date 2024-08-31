import { Choice } from '@/app/types/Choice';
import { Logic } from '@/app/types/Logic';
import { Theme } from '@/app/types/Theme';

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
