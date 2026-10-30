import { Icons, PageContainer, PaperWrapper } from 'babysteps-store';

const BREADCRUMB_LINK_CLASSES = 'flex h-8 items-center px-1';

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

export const WithBreadcrumbs = () => (
  <div className="bg-canvas w-[720px]">
    <PageContainer
      breadcrumbs={
        <nav aria-label="Naršymo kelias" className="py-5">
          <ol className="text-ink-muted flex items-center gap-1 text-sm">
            <li className="flex size-8 items-center justify-center">
              <Icons.House size={16} aria-hidden="true" />
            </li>
            <li aria-hidden="true" className="text-ink-faint flex">
              <Icons.ChevronRight size={14} />
            </li>
            <li className={BREADCRUMB_LINK_CLASSES}>Miegui</li>
            <li aria-hidden="true" className="text-ink-faint flex">
              <Icons.ChevronRight size={14} />
            </li>
            <li className="text-ink px-1 font-bold">Miegmaišiai</li>
          </ol>
        </nav>
      }
    >
      <h1 className="font-accent text-ink text-3xl font-bold">Miegmaišiai</h1>
      <p className="text-ink-muted text-sm">Šilti ir saugūs miegmaišiai kūdikiams nuo gimimo.</p>
    </PageContainer>
  </div>
);
