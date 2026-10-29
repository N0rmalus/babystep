import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  breadcrumbs?: ReactNode;
  className?: string;
};

const PAGE_WIDTH_CLASSES = 'px-gutter mx-auto w-full max-w-7xl';
const PAGE_CONTENT_CLASSES = 'flex flex-col gap-4 lg:gap-10';

export const PageContainer = ({ children, breadcrumbs, className }: Props) => {
  if (!breadcrumbs) {
    return <div className={cn(PAGE_WIDTH_CLASSES, PAGE_CONTENT_CLASSES, 'py-4 sm:py-14', className)}>{children}</div>;
  }

  return (
    <div className={cn(PAGE_WIDTH_CLASSES, 'pb-4 sm:pb-14')}>
      {breadcrumbs}
      <div className={cn(PAGE_CONTENT_CLASSES, className)}>{children}</div>
    </div>
  );
};
