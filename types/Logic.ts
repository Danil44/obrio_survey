import { Condition } from '@/types/Condition';

export type Logic<T extends string> = {
  conditions?: Condition<T>[];
  explicitNextId: T | null;
  referringId: T;
};
