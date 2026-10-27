type Props = {
  smallText: string;
  bigText: string;
  description?: string;
};

export const PageHeader = ({ bigText, smallText, description }: Props) => (
  <div className="relative flex flex-col items-start gap-1">
    <p className="eyebrow text-link">{smallText}</p>
    <h1 className="font-accent text-ink text-3xl font-bold text-balance sm:text-4xl">{bigText}</h1>
    {description && <p className="text-ink-muted mt-2 max-w-3xl text-lg leading-8">{description}</p>}
  </div>
);
