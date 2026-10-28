import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  labelledBy: string;
  className?: string;
};

export const HomeSection = ({ children, labelledBy, className }: Props) => {
  return (
    <section aria-labelledby={labelledBy} className={className}>
      {children}
    </section>
  );
};
