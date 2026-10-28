import { PageContainer, PaperWrapper } from 'babysteps-store';

export const PageSection = () => (
  <div className="bg-canvas w-[720px]">
    <PageContainer>
      <h1 className="font-accent text-ink text-3xl font-bold">Miegui</h1>
      <p className="text-ink-muted text-sm">Ramesnėms naktims: miegmaišiai, vystyklai ir naktinės lempos.</p>
      <div className="grid grid-cols-3 gap-4">
        <PaperWrapper>
          <p className="text-ink font-semibold">Miegmaišiai</p>
        </PaperWrapper>
        <PaperWrapper>
          <p className="text-ink font-semibold">Vystyklai</p>
        </PaperWrapper>
        <PaperWrapper>
          <p className="text-ink font-semibold">Lempos</p>
        </PaperWrapper>
      </div>
    </PageContainer>
  </div>
);
