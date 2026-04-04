import { cn } from '@/lib/utils';
import { ReactElement } from 'react';

type Props = {
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  icon: ReactElement;
  title?: string;
  disabled?: boolean;
};

const IconButton = ({ onClick, icon, title, variant, disabled }: Props) => {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        'flex items-center justify-center rounded-lg p-2 transition',
        variant === 'primary' && 'border bg-white text-black hover:bg-gray-100',
        variant === 'secondary' && 'bg-black text-white hover:bg-gray-800',
        variant === 'danger' && 'bg-rose-500 text-white hover:bg-rose-600',
      )}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
