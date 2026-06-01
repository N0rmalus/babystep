import { Check, RotateCcw } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import Container from '@/components/ui/container';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { CONTACT_EMAIL } from '@/lib/consts';

const returnCriteria = [
  'Prekės nebuvo naudojamos',
  'Prekės nebuvo sugadintos',
  'Kiekviena grąžinama prekė yra originalioje ir nepažeistoje pakuotėje',
  'Nuo prekių nebuvo nuimtos originalios etiketės',
  'Grąžinamos prekės yra pilnos komplektacijos ir išlaikiusios savo prekinę išvaizdą',
];

const GrazinimoInformacijaPage = () => {
  return (
    <Container>
      <PageHeader
        smallText="Pagalba"
        bigText="Grąžinimo informacija"
        description="Prekes galima grąžinti arba pakeisti per 14 dienų originalioje pakuotėje."
      />

      <PaperWrapper className="flex flex-col gap-5 sm:flex-row sm:gap-8">
        <div className="bg-tumbleweed-50 text-tumbleweed-700 flex size-12 shrink-0 items-center justify-center rounded-xl">
          <RotateCcw size={20} />
        </div>

        <div>
          <h2 className="font-accent text-xl font-semibold text-neutral-950 sm:text-2xl">Kaip grąžinti</h2>
          <p className="mt-3 text-base leading-8 text-neutral-600">
            Norėdami grąžinti įsigytas prekes, susisiekite su mumis nurodydami užsakymo datą, numerį, prekės pavadinimą
            ir konkrečią priežastį el. paštu{' '}
            <a className="font-semibold text-neutral-900 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </PaperWrapper>

      <section className="flex flex-col gap-5">
        <h2 className="font-accent text-xl font-semibold text-neutral-950 sm:text-2xl">
          Keičiamos ar grąžinamos prekės kriterijai
        </h2>

        <ul className="divide-tumbleweed-100 divide-y">
          {returnCriteria.map((criterion) => (
            <li key={criterion} className="flex items-start gap-4 py-5 sm:items-center sm:gap-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <Check size={20} aria-hidden="true" />
              </span>
              <span className="text-tumbleweed-950 text-lg leading-8">{criterion}</span>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
};

export default GrazinimoInformacijaPage;
