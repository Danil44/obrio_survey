import { Choice } from '@/app/types/Choice';
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
          className={
            'bg-lightGrey rounded-2xl text-center text-sm py-5 px-4 drop-shadow-md hover:bg-gradient-to-b from-purple-600 to-blue-600 hover:text-white'
          }
        >
          {choice.title}
        </Link>
      ))}
    </ul>
  );
}
