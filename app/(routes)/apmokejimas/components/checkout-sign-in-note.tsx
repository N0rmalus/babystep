// MOCK: the "prisijungsi" link does nothing until customer accounts exist.
export const CheckoutSignInNote = () => (
  <aside
    aria-label="Prisijungimas"
    className="border-tumbleweed-200 bg-tumbleweed-100 text-ink-soft rounded-2xl border px-4 py-3 text-sm leading-normal sm:px-5 sm:py-3.5 sm:text-base"
  >
    <p>
      Pirkti gali ir be paskyros. Jei{' '}
      <span className="whitespace-nowrap">
        <button type="button" className="text-link hover:text-ink font-semibold underline underline-offset-3">
          prisijungsi
        </button>
        ,
      </span>{' '}
      kitą kartą tavo duomenis užpildysime už tave.
    </p>
  </aside>
);
