import type { ReactNode } from 'react';

import Container from '@/components/ui/container';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { PageHeader } from '@/components/page-header';
import { LegalContentNav, type LegalContentNavItem } from '@/components/legal/legal-content-nav';
import { CONTACT_EMAIL } from '@/lib/consts';

type PrivacySection = {
  id: string;
  title: string;
  paragraphs: ReactNode[];
};

const privacySections = [
  {
    id: 'kas-mes-esame',
    title: 'Kas mes esame',
    paragraphs: [
      <>
        Mūsų tinklalapio adresas yra:{' '}
        <a className="text-tumbleweed-600 underline-offset-4 hover:underline" href="https://babystep.lt">
          https://babystep.lt
        </a>
      </>,
    ],
  },
  {
    id: 'komentarai',
    title: 'Komentarai',
    paragraphs: [
      'Kai lankytojai rašo komentarus tinklalapyje, mes renkame duomenis, matomus komentaro paskelbimo formoje, o taip pat lankytojo IP adresą bei naršyklės vartotojo įrašą, kad apsisaugotume nuo brukalų.',
      'Iš Jūsų el. pašto adreso gali būti sugeneruotas anonimizuotas duomenų įrašas (angl. hash) ir pateiktas Gravatar paslaugos teikėjui, norint patikrinti, ar Jūs naudojatės šia paslauga. Gravatar privatumo politika pateikiama čia: https://automattic.com/privacy/. Patvirtinus Jūsų komentarą, Jūsų profilio nuotrauka yra matoma viešai šalia Jūsų komentaro.',
    ],
  },
  {
    id: 'failai',
    title: 'Failai',
    paragraphs: [
      'Jei įkeliate nuotraukas į tinklalapį, turėtumėte vengti kelti nuotraukas su išsaugotais buvimo vietos duomenimis (EXIF GPS). Tinklalapio lankytojai gali atsisiųsti ir išgauti bet kokius buvimo vietos duomenis iš tinklalapyje esančių nuotraukų.',
    ],
  },
  {
    id: 'slapukai',
    title: 'Slapukai (cookies)',
    paragraphs: [
      'Jei parašote komentarą mūsų tinklalapyje, galite pasirinkti išsaugoti savo vardą, el. pašto adresą ir tinklalapį slapukuose. Taip daroma Jūsų patogumui, kad kitą kartą rašant komentarą nereikėtų vėl pildyti tų pačių duomenų.',
      'Jei apsilankote mūsų prisijungimo puslapyje, mes nustatysime laikiną slapuką, kad patikrintume, ar Jūsų naršyklė priima slapukus. Šiame slapuke nėra asmens duomenų ir jis pašalinamas uždarius naršyklę.',
      'Prisijungus prie paskyros, sukuriami slapukai, skirti prisijungimo informacijai ir ekrano nustatymams išsaugoti. Prisijungimo slapukai galioja ribotą laiką, o atsijungus jie pašalinami.',
    ],
  },
  {
    id: 'ikeliamas-turinys',
    title: 'Iš kitų tinklalapių įkeltas turinys',
    paragraphs: [
      'Šiame tinklalapyje gali būti įkelto turinio iš kitų tinklalapių, pavyzdžiui, vaizdo įrašų, paveikslėlių ar įrašų. Toks turinys veikia taip pat, lyg lankytojas apsilankytų tame kitame tinklalapyje.',
      'Šie tinklalapiai gali rinkti duomenis apie Jus, naudoti slapukus, įterpti papildomą trečiųjų šalių stebėjimą ir sekti Jūsų sąveiką su įkeltu turiniu, įskaitant sąveikos stebėjimą, jei turite paskyrą ir esate prisijungę prie to tinklalapio.',
    ],
  },
  {
    id: 'duomenu-saugojimas',
    title: 'Kaip ilgai mes saugome Jūsų duomenis',
    paragraphs: [
      'Jei parašote komentarą, jo tekstas ir metaduomenys saugomi neribotą laiką, kad galėtume automatiškai atpažinti ir patvirtinti vėlesnius komentarus vietoje jų laikymo moderavimo eilėje.',
      'Kai užsiregistruojate mūsų tinklalapyje ir tampate vartotoju, mes saugome visus Jūsų asmeninius duomenis, kuriuos Jūs pateikiate savo paskyroje. Kiekvienas vartotojas gali matyti, redaguoti ir ištrinti savo asmeninius duomenis bet kuriuo metu, išskyrus vartotojo vardą. Tinklalapio administratoriai tai pat gali matyti ir redaguoti šiuos duomenis.',
    ],
  },
  {
    id: 'jusu-teises',
    title: 'Jūsų teisės',
    paragraphs: [
      'Jei Jūs turite paskyrą šiame tinklalapyje, arba kada nors rašėte čia komentarą, galite reikalauti gauti duomenų eksporto failą su visais asmeniniais duomenimis, kuriuos mes turime apie Jus, įskaitant ir tuos, kuriuos pats mums pateikėte. Jūs taip pat galite reikalauti, kad mes ištrintume visus mūsų turimus Jūsų asmeninius duomenis. Šie abu reikalavimai negalioja duomenims, kuriuos mes privalome išsaugoti pagal įstatymą administraciniams, teisiniams ar saugumo tikslams.',
    ],
  },
] satisfies PrivacySection[];

const formatSectionNumber = (index: number) => String(index + 1).padStart(2, '0');

const privacyNavItems = privacySections.map((section, index) => ({
  id: section.id,
  number: formatSectionNumber(index),
  title: section.title,
})) satisfies LegalContentNavItem[];

const PrivatumoPolitikaPage = () => {
  return (
    <Container>
      <PageHeader
        smallText="Pagalba"
        bigText="Privatumo politika"
        description="Jūsų privatumas mums svarbus. Žemiau paaiškiname, kokius duomenis renkame, kodėl ir kaip ilgai juos saugome."
      />

      <p className="text-base text-neutral-500">Atnaujinta: 2026 m. birželio 1 d.</p>

      <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20">
        <LegalContentNav ariaLabel="Privatumo politikos turinys" items={privacyNavItems} />

        <article className="min-w-0 space-y-8">
          <div className="space-y-8">
            {privacySections.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="border-tumbleweed-100 flex scroll-mt-28 flex-col gap-4 border-b pb-8 last:border-b-0 last:pb-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-tumbleweed-700 font-accent text-lg font-bold">
                    {formatSectionNumber(index)}
                  </span>
                  <h2 className="font-accent text-2xl leading-tight font-semibold text-neutral-950 sm:text-3xl">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-5 text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.id}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <PaperWrapper className="max-w-xl">
            <h3 className="text-sm font-semibold tracking-[0.16em] text-neutral-500 uppercase">Turite klausimų?</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Jei norite pasinaudoti savo teisėmis arba turite klausimų apie savo duomenis, parašykite mums.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-flex text-sm font-semibold text-neutral-900 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </PaperWrapper>
        </article>
      </div>
    </Container>
  );
};

export default PrivatumoPolitikaPage;
