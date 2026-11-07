import type { Contact, CourierAddress, Delivery, DeliveryMethod, Payment } from '@/lib/checkout-api';
import { normalizePhone } from '@/lib/phone';

export type ContactValues = Contact;

export type CourierValues = Required<CourierAddress>;

export type CheckoutValues = {
  contact: ContactValues;
  deliveryMethod: DeliveryMethod;
  pickupPointId: string | null;
  courier: CourierValues;
  payment: Payment | null;
  isTermsAccepted: boolean;
};

export type CheckoutField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'pickupPoint'
  | 'street'
  | 'city'
  | 'postalCode'
  | 'payment'
  | 'terms';

export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export const CHECKOUT_FIELD_ORDER: CheckoutField[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'pickupPoint',
  'street',
  'city',
  'postalCode',
  'payment',
  'terms',
];

export const CONTACT_FIELDS: CheckoutField[] = ['firstName', 'lastName', 'email', 'phone'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_PATTERN = /^\d{8}$/;
const POSTAL_CODE_PATTERN = /^(LT-?)?(\d{5})$/i;

export const normalizePostalCode = (value: string) => {
  const match = value.trim().match(POSTAL_CODE_PATTERN);

  return match ? `LT-${match.at(2)}` : value.trim();
};

export const validateContact = (contact: ContactValues): CheckoutErrors => {
  const errors: CheckoutErrors = {};

  if (!contact.firstName.trim()) {
    errors.firstName = 'Įrašyk vardą.';
  }

  if (!contact.lastName.trim()) {
    errors.lastName = 'Įrašyk pavardę.';
  }

  if (!EMAIL_PATTERN.test(contact.email.trim())) {
    errors.email = contact.email.trim() ? 'Patikrink el. pašto adresą.' : 'Įrašyk el. paštą.';
  }

  if (!PHONE_DIGITS_PATTERN.test(normalizePhone(contact.phone))) {
    errors.phone = contact.phone.trim()
      ? 'Telefono numeris turi būti 8 skaitmenų, pvz. 612 34567.'
      : 'Įrašyk telefoną.';
  }

  return errors;
};

export const validateCheckout = (values: CheckoutValues): CheckoutErrors => {
  const errors = validateContact(values.contact);

  if (values.deliveryMethod === 'locker' && !values.pickupPointId) {
    errors.pickupPoint = 'Pasirink paštomatą.';
  }

  if (values.deliveryMethod === 'courier') {
    if (!values.courier.street.trim()) {
      errors.street = 'Įrašyk gatvę ir namo numerį.';
    }

    if (!values.courier.city.trim()) {
      errors.city = 'Įrašyk miestą.';
    }

    if (!POSTAL_CODE_PATTERN.test(values.courier.postalCode.trim())) {
      errors.postalCode = 'Pašto kodas atrodo taip: LT-00000.';
    }
  }

  if (!values.payment) {
    errors.payment = 'Pasirink, kaip mokėsi.';
  }

  if (!values.isTermsAccepted) {
    errors.terms = 'Pažymėk sutikimą, ir galėsi apmokėti.';
  }

  return errors;
};

export const toDelivery = (values: CheckoutValues): Delivery | null => {
  if (values.deliveryMethod === 'locker') {
    return values.pickupPointId ? { method: 'locker', pickupPointId: values.pickupPointId } : null;
  }

  const apartment = values.courier.apartment.trim();

  return {
    method: 'courier',
    address: {
      street: values.courier.street.trim(),
      ...(apartment ? { apartment } : {}),
      city: values.courier.city.trim(),
      postalCode: normalizePostalCode(values.courier.postalCode),
    },
  };
};

export const hasErrors = (errors: CheckoutErrors) => Object.values(errors).some(Boolean);
