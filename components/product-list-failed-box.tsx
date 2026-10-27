import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/button';
import { PaperWrapper } from '@/components/ui/paper-wrapper';

type Props = {
  onFocusRefresh: () => void;
};

export const ProductListFailedBox = ({ onFocusRefresh }: Props) => {
  return (
    <PaperWrapper className="border-danger-line bg-danger-soft flex justify-center">
      <div className="flex flex-row items-center gap-4">
        <span className="text-danger inline-flex rounded-full bg-white p-2">
          <AlertTriangle size={16} />
        </span>

        <p className="text-danger text-sm font-semibold">Įvyko klaida</p>

        <Button
          size="sm"
          variant="secondary"
          label="Bandyti iš naujo"
          elementBefore={<RotateCcw size={14} />}
          className="border-danger-line text-danger hover:bg-danger-soft ml-5 bg-white"
          onClick={onFocusRefresh}
        />
      </div>
    </PaperWrapper>
  );
};
