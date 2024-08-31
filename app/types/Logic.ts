import { Condition } from '@/app/types/Condition';

export type Logic = {
  conditions: Condition[];
  nextQuestionId: number;
};
