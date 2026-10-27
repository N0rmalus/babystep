import { AnchorHTMLAttributes, Ref } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string | { pathname?: string };
  ref?: Ref<HTMLAnchorElement>;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
};

const Link = ({ href, prefetch: _prefetch, replace: _replace, scroll: _scroll, shallow: _shallow, ...rest }: Props) => (
  <a href={typeof href === 'string' ? href : (href.pathname ?? '#')} {...rest} />
);

export default Link;
