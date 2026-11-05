import { TextField } from '@/components/ui/text-field';
import { CheckoutStep } from './checkout-step';
import { formatPhone, PHONE_PREFIX } from '@/lib/phone';
import type { CheckoutErrors, ContactValues } from './checkout-validation';

type Props = {
  contact: ContactValues;
  errors: CheckoutErrors;
  isEditing: boolean;
  isDone: boolean;
  onChange: (field: keyof ContactValues, value: string) => void;
  onToggleEdit: () => void;
};

export const ContactStep = ({ contact, errors, isEditing, isDone, onChange, onToggleEdit }: Props) => (
  <CheckoutStep
    number={1}
    state={isDone ? 'done' : 'current'}
    title="Kontaktai"
    headingId="checkout-contact"
    action={
      <button
        type="button"
        onClick={onToggleEdit}
        className="text-link hover:text-tumbleweed-800 px-5 text-sm font-semibold hover:underline"
      >
        {isEditing ? 'Išsaugoti' : 'Keisti'}
      </button>
    }
  >
    {isEditing ? (
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
        <TextField
          label="Vardas"
          name="firstName"
          autoComplete="given-name"
          value={contact.firstName}
          onChange={(event) => onChange('firstName', event.target.value)}
          error={errors.firstName}
        />
        <TextField
          label="Pavardė"
          name="lastName"
          autoComplete="family-name"
          value={contact.lastName}
          onChange={(event) => onChange('lastName', event.target.value)}
          error={errors.lastName}
        />
        <TextField
          label="El. paštas"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={contact.email}
          onChange={(event) => onChange('email', event.target.value)}
          error={errors.email}
          className="col-span-2 sm:col-span-1"
        />
        <TextField
          label="Telefonas"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          prefix={PHONE_PREFIX}
          placeholder="612 34567"
          value={contact.phone}
          onChange={(event) => onChange('phone', event.target.value)}
          error={errors.phone}
          className="col-span-2 sm:col-span-1"
        />
      </div>
    ) : (
      <p className="text-ink-muted -mt-1.5 text-sm leading-relaxed sm:text-base">
        {contact.firstName.trim()} {contact.lastName.trim()}
        <br />
        {contact.email.trim()} · {formatPhone(contact.phone)}
      </p>
    )}
  </CheckoutStep>
);
