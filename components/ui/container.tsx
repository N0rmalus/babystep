import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-10 pb-10 sm:px-6 sm:pt-14 sm:pb-14 lg:gap-10 lg:px-8',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
