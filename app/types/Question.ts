import { Choice } from '@/app/types/Choice';
import { Condition } from '@/app/types/Condition';
import { Theme } from '@/app/types/Theme';

export type Question = {
  id: number;
  title: string;
  choices: Array<Choice>;
  conditions: Array<Condition>;
  nextQuestionId: number | null;
  theme?: Theme;
};
