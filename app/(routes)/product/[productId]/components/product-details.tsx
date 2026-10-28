'use client';

import { ReactNode } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

import { RichTextContent } from '@/components/ui/rich-text-content';
import { MOCK_PRODUCT_SPECS } from '@/lib/mocks/product';
import { cn } from '@/lib/utils';

type Props = {
  description: string | null;
};

export const ProductDetails = ({ description }: Props) => {
  const sections = [
    { id: 'description', label: 'Aprašymas', content: <ProductDescription description={description} /> },
    // MOCK: specifications until "Product specifications".
    { id: 'specs', label: 'Papildoma informacija', content: <ProductSpecs /> },
  ];

  return (
    <section aria-label="Apie prekę" className="pt-7 lg:max-w-3xl lg:pt-12">
      <TabGroup className="hidden lg:block">
        <TabList className="bg-muted inline-flex gap-1.5 rounded-full p-1">
          {sections.map((section) => (
            <Tab
              key={section.id}
              className="text-ink-muted data-selected:text-ink data-selected:shadow-card data-focus:outline-tumbleweed-500 h-11 rounded-full px-5.5 font-semibold transition outline-none data-focus:outline-2 data-focus:outline-offset-2 data-selected:bg-white"
            >
              {section.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="pt-6">
          {sections.map((section) => (
            <TabPanel key={section.id}>{section.content}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      <div className="border-line border-b lg:hidden">
        {sections.map((section, index) => (
          <Disclosure key={section.id} as="div" defaultOpen={index === 0} className="border-line border-t">
            <h2>
              <DisclosureButton className="group text-ink flex min-h-15 w-full items-center justify-between text-left text-lg font-semibold">
                {section.label}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className="text-ink-muted transition-transform group-data-open:rotate-180"
                />
              </DisclosureButton>
            </h2>
            <DisclosurePanel className="pb-6">{section.content}</DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </section>
  );
};

const ProductDescription = ({ description }: { description: string | null }) => {
  if (!description?.trim()) {
    return <p className="text-ink-muted text-sm">Aprašymo nėra.</p>;
  }

  return <RichTextContent content={description} />;
};

const ProductSpecs = () => (
  <dl className="grid grid-cols-[7rem_1fr] text-sm sm:text-base lg:grid-cols-[11rem_1fr]">
    {/* MOCK: specifications until "Product specifications". */}
    {MOCK_PRODUCT_SPECS.map((spec, index) => {
      const isLast = index === MOCK_PRODUCT_SPECS.length - 1;

      return (
        <SpecRow key={spec.label} isLast={isLast} label={spec.label}>
          {spec.value}
        </SpecRow>
      );
    })}
  </dl>
);

const SpecRow = ({ label, isLast, children }: { label: string; isLast: boolean; children: ReactNode }) => (
  <>
    <dt className={cn('py-3 pr-6 font-semibold lg:py-4', isLast ? '' : 'border-line border-b')}>{label}</dt>
    <dd className={cn('text-ink-soft py-3 lg:py-4', isLast ? '' : 'border-line border-b')}>{children}</dd>
  </>
);
