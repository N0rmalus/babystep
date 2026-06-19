'use client';

import { ReactNode, useState } from 'react';
import { Check, ChevronDown, Leaf, PackageCheck, ShieldCheck, Truck, WashingMachine } from 'lucide-react';

import { Product } from '@/actions/types';
import { ProductColorOption, ProductSizeOption } from '@/components/info';
import { RichTextContent } from '@/components/ui/rich-text-content';
import { cn } from '@/lib/utils';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

type Props = {
  product: Product;
  selectedColor: ProductColorOption;
  selectedSize: ProductSizeOption;
};

type DetailSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export const ProductInformation = ({ product, selectedColor, selectedSize }: Props) => {
  const [openSectionId, setOpenSectionId] = useState('description');
  const detailSections = getDetailSections(product);
  const specRows = getSpecificationRows(selectedColor, selectedSize);

  return (
    <section className=" grid items-start gap-10  lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] lg:gap-12">
      <div className="border-t border-neutral-200">
        {detailSections.map((section) => {
          const isOpen = section.id === openSectionId;

          return (
            <div key={section.id} className="border-b border-neutral-200 py-3 md:py-6">
              <button
                type="button"
                onClick={() => setOpenSectionId(isOpen ? '' : section.id)}
                className="tap-surface flex w-full items-center justify-between gap-4 text-left"
              >
                <h3 className="sm:text-lg leading-tight font-accent font-bold text-neutral-950 md:text-xl">{section.title}</h3>
                <span
                  className={cn(
                    'flex size-8 md:size-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition',
                    isOpen && 'border-neutral-950 bg-neutral-950 text-white',
                  )}
                >
                  <ChevronDown size={16} className={cn('transition', isOpen && 'rotate-180')} />
                </span>
              </button>

              <div
                className={cn(
                  'grid overflow-hidden transition-all duration-300',
                  isOpen ? 'grid-rows-[1fr] pt-4' : 'grid-rows-[0fr]',
                )}
              >
                <div className="min-h-0">
                  <div className=" text-base leading-7 text-neutral-600">{section.content}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PaperWrapper>
        <h2 className="text-2xl font-bold font-accent text-neutral-950">Specifikacija</h2>
        <p className="mt-2 text-sm text-neutral-500">
          Pasirinktas variantas: {selectedSize.label} · {selectedColor.label}
        </p>

        <dl className="mt-6 divide-y divide-neutral-200">
          {specRows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-4 py-4 text-sm"
            >
              <dt className="text-neutral-500">{row.label}</dt>
              <dd className="text-right font-semibold text-neutral-950">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
          <span className="inline-flex items-center gap-2">
            <Leaf size={16} className="text-tumbleweed-600" />
            OEKO-TEX
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-tumbleweed-600" />
            Hipoalerginis
          </span>
          <span className="inline-flex items-center gap-2">
            <WashingMachine size={16} className="text-tumbleweed-600" />
            30 °C skalbimas
          </span>
        </div>
      </PaperWrapper>
    </section>
  );
};

const getDetailSections = (product: Product): DetailSection[] => {
  const hasDescription = Boolean(product.description?.trim());

  return [
    {
      id: 'description',
      title: 'Aprašymas',
      content: hasDescription ? (
        <RichTextContent content={product.description} />
      ) : (
        <p>
          Švelnus kūdikio pledukas kasdieniam miegui, vežimėliui ir ramioms kelionėms. Tinka naudoti nuo pirmųjų dienų.
        </p>
      ),
    },
    {
      id: 'merino',
      title: 'Kuo ypatinga merino vilna?',
      content: (
        <ul className="space-y-3">
          <li className="flex gap-3">
            <Check size={18} className="text-salmon-600 mt-1 shrink-0" />
            Reguliuoja šilumą, todėl tinka tiek vėsesniam, tiek šiltesniam sezonui.
          </li>
          <li className="flex gap-3">
            <Check size={18} className="text-salmon-600 mt-1 shrink-0" />
            Pluoštas švelnus kūdikio odai ir natūraliai praleidžia orą.
          </li>
          <li className="flex gap-3">
            <Check size={18} className="text-salmon-600 mt-1 shrink-0" />
            Merino vilna sugeria drėgmę, bet išlieka maloni prisilietimui.
          </li>
        </ul>
      ),
    },
    {
      id: 'care',
      title: 'Priežiūra',
      content: (
        <p>
          Skalbkite vilnos režimu iki 30 °C, naudokite vilnai skirtą skalbiklį ir džiovinkite patiesus. Nerekomenduojama
          naudoti džiovyklės ar baliklių.
        </p>
      ),
    },
    {
      id: 'delivery',
      title: 'Pristatymas ir grąžinimas',
      content: (
        <div className="grid gap-4 sm:grid-cols-2">
          <span className="flex gap-3">
            <Truck size={20} className="text-tumbleweed-600 mt-1 shrink-0" />
            Įprastai išsiunčiame per 1-2 darbo dienas, kai prekė yra sandėlyje.
          </span>
          <span className="flex gap-3">
            <PackageCheck size={20} className="text-tumbleweed-600 mt-1 shrink-0" />
            Netikusią prekę galima grąžinti pagal parduotuvės grąžinimo taisykles.
          </span>
        </div>
      ),
    },
  ];
};

const getSpecificationRows = (selectedColor: ProductColorOption, selectedSize: ProductSizeOption) => {
  return [
    { label: 'Medžiaga', value: '100 % merino vilna' },
    { label: 'Matmenys', value: selectedSize.label },
    { label: 'Spalva', value: selectedColor.label },
    { label: 'Svoris', value: selectedSize.id === '100x140' ? '430 g' : '320 g' },
    { label: 'Mezgimas', value: 'Rankinė mašina' },
    { label: 'Sezonas', value: 'Visiems metams' },
    { label: 'Kilmė', value: 'Naujoji Zelandija · ES' },
  ] satisfies { label: string; value: string }[];
};
