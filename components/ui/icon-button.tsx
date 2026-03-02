import { cn } from '@/lib/utils';
import { MouseEventHandler } from 'react';

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
  title?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, className, title }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-full border bg-white p-2 shadow-md transition hover:scale-110',
        className,
      )}
      title={title}
    >
      {icon}
    </button>
  );
};

export default IconButton;
