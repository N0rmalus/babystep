import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/button';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

type Props = {
  onFocusRefresh: () => void;
};

export const ProductListFailedBox = ({ onFocusRefresh }: Props) => {
  return (
    <PaperWrapper className="flex justify-center border-rose-200 bg-rose-50/80">
      <div className="flex flex-row items-center gap-4">
        <span className="inline-flex rounded-full bg-rose-100 p-2 text-rose-600">
          <AlertTriangle size={16} />
        </span>

        <p className="text-sm font-semibold text-rose-700">Įvyko klaida</p>

        <Button
          size="sm"
          variant="secondary"
          label="Bandyti iš naujo"
          elementBefore={<RotateCcw size={14} />}
          className="ml-5 border-rose-200 bg-white text-rose-700 hover:bg-rose-100"
          onClick={onFocusRefresh}
        />
      </div>
    </PaperWrapper>
  );
};
