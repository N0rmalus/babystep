import { cn } from '@/lib/utils';
import { MouseEventHandler, ReactElement } from 'react';

interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  variant?: 'primary' | 'secondary' | 'danger';
  icon: ReactElement;
  className?: string;
  title?: string;
  disabled?: boolean;
}

const IconButton = ({ onClick, icon, className, title, variant, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center p-2 transition',
        variant === 'primary' && 'border bg-white text-black hover:bg-gray-100',
        variant === 'secondary' && 'bg-black text-white hover:bg-gray-800',
        variant === 'danger' && 'bg-rose-500 text-white hover:bg-rose-600',
        className,
      )}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
