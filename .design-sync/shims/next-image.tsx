import { CSSProperties, ImgHTMLAttributes } from 'react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
};

const fillStyle: CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%' };

const Image = ({ src, fill, priority: _p, quality: _q, placeholder: _ph, blurDataURL: _b, unoptimized: _u, style, ...rest }: Props) => (
  <img src={typeof src === 'string' ? src : src.src} style={fill ? { ...fillStyle, ...style } : style} {...rest} />
);

export default Image;
