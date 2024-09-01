import { Choice } from './Choice';
import { Theme } from './Theme';

export type Screen = {
  choices: Choice[];
  id: string;
  subtext?: string;
  text?: string;
  theme?: Theme;
  title: string;
};
