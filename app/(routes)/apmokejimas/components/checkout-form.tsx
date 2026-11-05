'use client';

import { FormEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { getDeliveryPrice } from '@/business/delivery-pricing';
import type { CartLine } from '@/hooks/use-cart';
import {
  createOrder,
  type CreateOrderResult,
  type DeliveryConfig,
  type DeliveryMethod,
  type Payment,
  type PaymentMethods,
} from '@/lib/checkout-api';
import { normalizePhone, PHONE_PREFIX } from '@/lib/phone';
import type { CheckoutLine } from './checkout-lines';
import {
  CHECKOUT_FIELD_ORDER,
  type CheckoutErrors,
  type CheckoutField,
  type CheckoutValues,
  CONTACT_FIELDS,
  type ContactValues,
  type CourierValues,
  hasErrors,
  toDelivery,
  validateCheckout,
  validateContact,
} from './checkout-validation';
import { ContactStep } from './contact-step';
import { DeliveryStep } from './delivery-step';
import { OrderSummaryToggle } from './order-summary-toggle';
import { PaymentStep } from './payment-step';
import { PayButton, ReviewStep } from './review-step';
import { StockProblemNote } from './stock-problem-notice';

type Props = {
  cartLines: CartLine[];
  lines: CheckoutLine[];
  itemCount: number;
  subtotal: number;
  deliveryConfig: DeliveryConfig;
  paymentMethods: PaymentMethods;
  hasStockProblem: boolean;
};

const EMPTY_CONTACT: ContactValues = { firstName: '', lastName: '', email: '', phone: '' };
const EMPTY_COURIER: CourierValues = { street: '', apartment: '', city: '', postalCode: '' };
const CHECKOUT_ERROR_MESSAGE = 'Nepavyko sukurti užsakymo. Bandyk dar kartą.';

export const CheckoutForm = ({
  cartLines,
  lines,
  itemCount,
  subtotal,
  deliveryConfig,
  paymentMethods,
  hasStockProblem,
}: Props) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [isContactEditing, setIsContactEditing] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    deliveryConfig.options.at(0)?.method ?? 'locker',
  );
  const [pickupPointId, setPickupPointId] = useState<string | null>(null);
  const [courier, setCourier] = useState(EMPTY_COURIER);
  const [payment, setPayment] = useState<Payment | null>(getDefaultPayment(paymentMethods));
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const values: CheckoutValues = { contact, deliveryMethod, pickupPointId, courier, payment, isTermsAccepted };
  const option = deliveryConfig.options.find((current) => current.method === deliveryMethod);
  const deliveryPrice = getDeliveryPrice({
    price: option?.price ?? 0,
    subtotal,
    freeShippingThreshold: deliveryConfig.freeShippingThreshold,
  });
  const total = subtotal + deliveryPrice;
  const isContactDone = !isContactEditing && !hasErrors(validateContact(contact));
  const isDeliveryDone = toDelivery(values) !== null && !hasDeliveryErrors(validateCheckout(values));

  const clearError = (field: CheckoutField) => {
    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      return { ...current, [field]: undefined };
    });
  };

  const handleContactChange = (field: keyof ContactValues, value: string) => {
    setContact((current) => ({ ...current, [field]: value }));
    clearError(field);
  };

  const handleContactToggle = () => {
    if (!isContactEditing) {
      setIsContactEditing(true);
      return;
    }

    const contactErrors = validateContact(contact);

    if (hasErrors(contactErrors)) {
      setErrors((current) => ({ ...current, ...contactErrors }));
      focusFirstError(contactErrors);
      return;
    }

    setIsContactEditing(false);
  };

  const handleCourierChange = (field: keyof CourierValues, value: string) => {
    setCourier((current) => ({ ...current, [field]: value }));

    if (field !== 'apartment') {
      clearError(field);
    }
  };

  const focusFirstError = (nextErrors: CheckoutErrors) => {
    const firstField = CHECKOUT_FIELD_ORDER.find((field) => nextErrors[field]);

    if (!firstField) {
      return;
    }

    requestAnimationFrame(() => {
      const element = formRef.current?.querySelector<HTMLInputElement>(`[name="${firstField}"]`);
      element?.focus();
      element?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasStockProblem) {
      return;
    }

    const nextErrors = validateCheckout(values);
    const delivery = toDelivery(values);

    if (hasErrors(nextErrors) || !delivery || !payment) {
      setErrors(nextErrors);

      if (CONTACT_FIELDS.some((field) => nextErrors[field])) {
        setIsContactEditing(true);
      }

      focusFirstError(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createOrder({
        lines: cartLines,
        contact: {
          firstName: contact.firstName.trim(),
          lastName: contact.lastName.trim(),
          email: contact.email.trim(),
          phone: `${PHONE_PREFIX}${normalizePhone(contact.phone)}`,
        },
        delivery,
        payment,
      });

      if (result.status === 'rejected') {
        toast.error(getRejectionMessage({ result, lines }));
        setIsSubmitting(false);
        return;
      }

      window.location.href = result.paymentUrl;
    } catch {
      toast.error(CHECKOUT_ERROR_MESSAGE);
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-7 sm:gap-9">
      <OrderSummaryToggle lines={lines} itemCount={itemCount} total={total} />

      <ol className="flex flex-col">
        <ContactStep
          contact={contact}
          errors={errors}
          isEditing={isContactEditing}
          isDone={isContactDone}
          onChange={handleContactChange}
          onToggleEdit={handleContactToggle}
        />
        <DeliveryStep
          deliveryConfig={deliveryConfig}
          subtotal={subtotal}
          method={deliveryMethod}
          pickupPointId={pickupPointId}
          courier={courier}
          errors={errors}
          isDone={isDeliveryDone}
          onMethodChange={setDeliveryMethod}
          onPickupPointChange={(point) => {
            setPickupPointId(point.id);
            clearError('pickupPoint');
          }}
          onCourierChange={handleCourierChange}
        />
        <PaymentStep
          paymentMethods={paymentMethods}
          payment={payment}
          error={errors.payment}
          onChange={(nextPayment) => {
            setPayment(nextPayment);
            clearError('payment');
          }}
        />
        <ReviewStep
          lines={lines}
          subtotal={subtotal}
          deliveryMethod={deliveryMethod}
          deliveryPrice={deliveryPrice}
          total={total}
          isTermsAccepted={isTermsAccepted}
          termsError={errors.terms}
          isSubmitting={isSubmitting}
          hasStockProblem={hasStockProblem}
          onTermsChange={(isAccepted) => {
            setIsTermsAccepted(isAccepted);
            clearError('terms');
          }}
        />
      </ol>

      <div className="border-line bg-canvas shadow-bar sticky bottom-0 z-20 -mx-4 -mt-2 flex flex-col gap-2 border-t px-4 pt-3 pb-3.5 sm:hidden">
        {hasStockProblem && <StockProblemNote />}
        <PayButton total={total} isSubmitting={isSubmitting} isDisabled={hasStockProblem} />
      </div>
    </form>
  );
};

const DELIVERY_FIELDS: CheckoutField[] = ['pickupPoint', 'street', 'city', 'postalCode'];

const hasDeliveryErrors = (errors: CheckoutErrors) => DELIVERY_FIELDS.some((field) => errors[field]);

const getDefaultPayment = (paymentMethods: PaymentMethods): Payment | null => {
  const firstBank = paymentMethods.banks.at(0);

  if (firstBank) {
    return { method: 'bank', bankCode: firstBank.code };
  }

  return paymentMethods.isCardEnabled ? { method: 'card' } : null;
};

const getRejectionMessage = ({
  result,
  lines,
}: {
  result: Extract<CreateOrderResult, { status: 'rejected' }>;
  lines: CheckoutLine[];
}) => {
  const getName = (productId: string) =>
    lines.find((line) => line.productId === productId)?.name ?? `prekė (${productId.slice(0, 8)})`;

  if (result.invalidProductIds.length > 0) {
    return `Šios prekės nebegalimos: ${result.invalidProductIds.map(getName).join(', ')}.`;
  }

  if (result.insufficientStockItems.length > 0) {
    const details = result.insufficientStockItems.map(
      (item) => `${getName(item.productId)} (likutis: ${item.available}, pasirinkta: ${item.requested})`,
    );

    return `Pasikeitė likučiai: ${details.join('; ')}. Pakoreguok krepšelį.`;
  }

  return result.message || CHECKOUT_ERROR_MESSAGE;
};
