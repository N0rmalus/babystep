type Props = {
  title: string;
  description: string;
};

export const PageHeader = ({ title, description }: Props) => (
  <div className="relative flex flex-col items-start gap-2">
    <p className="text-tumbleweed-700 text-xs font-semibold tracking-widest uppercase">{description}</p>
    <h1 className="font-accent text-3xl font-bold text-neutral-900 sm:text-4xl">{title}</h1>
  </div>
);
