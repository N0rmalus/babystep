import { Truck } from 'lucide-react';

import { PageHeader } from '@/components/page-header';
import Container from '@/components/ui/container';
import { PaperWrapper } from '@/components/ui/paper-wrapper';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/consts';

const deliveryMethods = ['Omniva', 'LP Express', 'Kurjeris'];

const deliveryPrices = [
  {
    title: 'Į paštomatą',
    description: 'Omniva · LP Express',
    price: '3,49 €',
  },
  {
    title: 'Kurjeriu į namus ar biurą',
    description: 'Pristatymas iki durų',
    price: '6,49 €',
  },
];

const deliveryTimeline = [
  {
    label: 'Išsiunčiame',
    value: '1–3',
    unit: 'darbo dienos',
    description: 'Užsakytas ir apmokėtas prekes išsiunčiame per 1–3 d. d., jei nenurodytas kitas terminas.',
  },
  {
    label: 'Gaunate',
    value: '2–4',
    unit: 'darbo dienos',
    description: 'Vidutiniškai prekes gausite per 2–4 darbo dienas nuo užsakymo apmokėjimo gavimo.',
  },
];

const PristatymoInformacijaPage = () => {
  return (
    <Container>
      <PageHeader
        smallText="Pagalba"
        bigText="Pristatymo informacija"
        description="Prekes pristatome visoje Lietuvoje. Siunčiame Omniva ir LP Express paštomatais bei kurjeriais."
      />

      <div className="flex flex-wrap gap-3">
        {deliveryMethods.map((method) => (
          <div
            key={method}
            className="border-tumbleweed-100 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-semibold text-neutral-900 sm:px-5 sm:text-base"
          >
            <Truck className="text-tumbleweed-600 size-4" />
            {method}
          </div>
        ))}
      </div>

      <div className="bg-tumbleweed-950 mx-auto flex w-full max-w-5xl flex-col gap-2 rounded-3xl px-6 py-8 text-white sm:px-10 lg:px-14">
        <h2 className="font-accent text-xl leading-tight font-semibold sm:text-2xl">
          Nemokamas pristatymas nuo {FREE_SHIPPING_THRESHOLD} €
        </h2>
        <p className="text-tumbleweed-100 max-w-2xl text-base leading-7">
          Perkant prekių daugiau kaip už {FREE_SHIPPING_THRESHOLD} €, pristatymą Lietuvoje apmokame mes{' '}
          <span className="underline">(išskyrus Kuršių Neriją)</span>.
        </p>
      </div>

      <div className="flex w-full flex-col gap-5">
        <div className="space-y-1">
          <h2 className="font-accent text-xl font-semibold text-neutral-950 sm:text-2xl">Pristatymo kaina</h2>
          <p className="text-base leading-7 text-neutral-500">
            Užsakymams iki {FREE_SHIPPING_THRESHOLD} € taikomas pristatymo mokestis{' '}
            <span className="underline">(išskyrus Kuršių Neriją)</span>:
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {deliveryPrices.map((item) => (
            <PaperWrapper key={item.title} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-neutral-950">{item.title}</h3>
                <p className="text-base text-neutral-500">{item.description}</p>
              </div>
              <p className="font-accent text-2xl font-semibold text-neutral-950 sm:text-3xl">{item.price}</p>
            </PaperWrapper>
          ))}
        </div>

        <p className="leading-7 text-neutral-500">
          Ši suma įskaičiuojama į bendrą užsakymo sumą, kurią matysite sąskaitoje prieš apmokėjimą.
        </p>
      </div>

      <div className="flex w-full flex-col gap-5">
        <h2 className="font-accent text-2xl font-semibold text-neutral-950 sm:text-3xl">Pristatymo terminai</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {deliveryTimeline.map((item) => (
            <PaperWrapper key={item.label} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <p className="text-tumbleweed-700 text-sm font-bold tracking-[0.18em] uppercase">{item.label}</p>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="font-accent text-2xl leading-none font-semibold text-neutral-950 sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="text-neutral-500g text-base">{item.unit}</p>
                </div>
              </div>

              <p className="text-base leading-8 text-neutral-600">{item.description}</p>
            </PaperWrapper>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PristatymoInformacijaPage;
