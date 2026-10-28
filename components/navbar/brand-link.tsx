import Image from 'next/image';
import Link from 'next/link';
import { MouseEventHandler } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const BrandLink = ({ onClick }: Props) => {
  return (
    <Link
      href="/"
      aria-label="Babystep pradžia"
      onClick={onClick}
      className="group font-accent text-ink inline-flex items-center gap-2 text-2xl font-bold tracking-tight lg:text-3xl"
    >
      <Image
        src="/logo.png"
        alt=""
        width={50}
        height={50}
        className="size-8 object-contain transition-transform duration-200 ease-out group-hover:rotate-6 lg:size-10"
      />
      Babystep
    </Link>
  );
};
