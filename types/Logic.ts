import { Condition } from '@/types/Condition';

export type Logic = {
  conditions: Condition[];
  nextQuestionId: number;
};
