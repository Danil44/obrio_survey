import { Choice } from '@/src/types/Choice';
import Link from 'next/link';

export function OptionList({
  options,
  getPath,
  onSelect,
  checkIsActive,
}: {
  options: Choice[];
  onSelect: (choice: Choice) => () => void;
  getPath: (choice: Choice) => string;
  checkIsActive: (choice: Choice) => boolean;
}) {
  return (
    <ul className={'flex flex-col gap-y-5 pb-6'}>
      {options.map((choice) => {
        const isActive = checkIsActive(choice);
        return (
          <Link
            key={choice.id}
            href={getPath(choice)}
            onClick={onSelect(choice)}
            className={`${isActive ? 'bg-gradient text-light' : ''} bg-secondary rounded-2xl text-center text-buttons text-sm py-5 px-4 drop-shadow-md dark:text-purple hover:bg-gradient hover:text-light dark:hover:bg-none`}
          >
            {choice.title}
          </Link>
        );
      })}
    </ul>
  );
}
