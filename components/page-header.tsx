type Props = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: Props) => (
  <div className="relative flex flex-col items-start gap-2">
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tumbleweed-700">{description}</p>
    <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">{title}</h1>
  </div>
);
