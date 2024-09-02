import { Choice } from '@/src/types/Choice';
import Link from 'next/link';

export function OptionList({
  options,
  getPath,
  onSelect,
}: {
  options: Choice[];
  onSelect: (choice: Choice) => () => void;
  getPath: (choice: Choice) => string;
}) {
  return (
    <ul className={'flex flex-col gap-y-5'}>
      {options.map((choice) => (
        <Link
          key={choice.id}
          href={getPath(choice)}
          onClick={onSelect(choice)}
          className={`bg-secondary rounded-2xl text-center text-buttons text-sm py-5 px-4 drop-shadow-md dark:text-purple`}
        >
          {choice.title}
        </Link>
      ))}
    </ul>
  );
}
