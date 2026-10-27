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
        variant === 'primary' && 'text-ink hover:bg-muted border bg-white',
        variant === 'secondary' && 'bg-ink hover:bg-ink-soft text-white',
        variant === 'danger' &&
          'hover:border-danger-line hover:bg-danger-soft text-ink-muted hover:text-danger border bg-white',
      )}
      title={title}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default IconButton;
