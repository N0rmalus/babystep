'use client';

import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Modal } from '@/components/ui/modal';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { CONTACT_EMAIL } from '@/lib/consts';
import { MOCK_SIZE_GUIDE_ROWS } from '@/lib/mocks/product';
import { cn } from '@/lib/utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SIZE_GUIDE_COLUMNS = 'grid grid-cols-[1.35fr_1fr_1fr_0.8fr] sm:grid-cols-[1.3fr_1fr_1fr_1fr]';

export const SizeGuideDialog = ({ isOpen, onClose }: Props) => {
  const isMobile = useIsMobile('lg');

  if (isMobile) {
    return (
      <BottomSheet open={isOpen} onClose={onClose}>
        <SizeGuideContent />
      </BottomSheet>
    );
  }

  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <SizeGuideContent />
    </Modal>
  );
};

const SizeGuideContent = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 lg:pr-12">
        <h2 className="font-accent text-2xl leading-tight font-bold text-balance lg:text-3xl">Kaip išsirinkti dydį?</h2>
        <p className="text-ink-soft text-sm leading-relaxed sm:text-base">
          Rinkis pagal mažylio ūgį, ne tik amžių. Jei abejoji tarp dviejų dydžių, imk didesnį, užaugs.
        </p>
      </div>

      <div
        role="table"
        aria-label="Dydžių lentelė"
        className="border-line overflow-hidden rounded-2xl border text-sm tabular-nums sm:text-base"
      >
        <div role="row" className={cn(SIZE_GUIDE_COLUMNS, 'bg-muted-soft eyebrow text-ink-muted')}>
          <span role="columnheader" className="px-3 py-2.5 sm:px-5">
            Dydis
          </span>
          <span role="columnheader" className="px-3 py-2.5 sm:px-5">
            Ūgis
          </span>
          <span role="columnheader" className="px-3 py-2.5 sm:px-5">
            Svoris
          </span>
          <span role="columnheader" className="px-3 py-2.5 sm:px-5">
            Ilgis
          </span>
        </div>
        {/* MOCK: size guide rows until "Product variants" and "Product specifications". */}
        {MOCK_SIZE_GUIDE_ROWS.map((row) => (
          <div
            key={row.id}
            role="row"
            className={cn(SIZE_GUIDE_COLUMNS, 'border-line min-h-12 items-center border-t bg-white sm:min-h-13')}
          >
            <span role="rowheader" className="text-ink px-3 font-bold whitespace-nowrap sm:px-5">
              {row.label}
            </span>
            <span role="cell" className="text-ink-soft px-3 whitespace-nowrap sm:px-5">
              {row.height}
            </span>
            <span role="cell" className="text-ink-soft px-3 whitespace-nowrap sm:px-5">
              {row.weight}
            </span>
            <span role="cell" className="text-ink-soft px-3 whitespace-nowrap sm:px-5">
              {row.length}
            </span>
          </div>
        ))}
      </div>

      <div className="border-line border-t pt-4">
        <p className="text-ink-soft text-sm sm:text-base">
          Vis dar abejoji?{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-link font-semibold underline underline-offset-3">
            Parašyk mums
          </a>
          , mielai padėsim.
        </p>
      </div>
    </div>
  );
};
