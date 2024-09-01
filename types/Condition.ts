export type Condition<T> = {
  referringScreenId?: T;
  nextScreenId: T;
  expectedChoiceId: number;
};
