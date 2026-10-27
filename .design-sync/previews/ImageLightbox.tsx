import { ImageLightbox } from 'babysteps-store';

const photo = (bg: string, fg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="${bg}"/><ellipse cx="300" cy="500" rx="170" ry="20" fill="#000" opacity="0.06"/><rect x="200" y="150" width="200" height="330" rx="90" fill="${fg}"/><circle cx="300" cy="150" r="52" fill="${fg}"/></svg>`,
  )}`;

export const ProductGallery = () => (
  <div className="bg-muted relative aspect-square w-80 overflow-hidden rounded-3xl">
    <ImageLightbox
      alt="Muslino miegmaišis"
      className="cursor-zoom-in object-cover"
      images={[{ src: photo('#f1ebe3', '#d9a37f') }, { src: photo('#fef1f0', '#faaaa2') }]}
    />
  </div>
);
