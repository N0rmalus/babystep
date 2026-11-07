import { ArrowRight } from 'lucide-react';

import Button from '@/components/ui/button';

type Props = {
  isDisabled: boolean;
  size?: 'md' | 'lg';
  hasIcon?: boolean;
};

const CHECKOUT_LABEL = 'Pereiti prie apmokėjimo';

export const CheckoutLinkButton = ({ isDisabled, size = 'md', hasIcon = true }: Props) => {
  const icon = hasIcon ? <ArrowRight size={18} aria-hidden="true" /> : undefined;

  if (isDisabled) {
    return <Button label={CHECKOUT_LABEL} elementAfter={icon} size={size} onClick={() => {}} disabled fullWidth />;
  }

  return <Button href="/apmokejimas" label={CHECKOUT_LABEL} elementAfter={icon} size={size} fullWidth />;
};
