import Image from 'next/image';
import { Instagram } from 'lucide-react';

import { InstagramPost } from '@/actions/get-instagram-posts';
import { getImageUrl } from '@/lib/image-url';

type Props = {
  posts: InstagramPost[];
};

export const InstagramFeed = ({ posts }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noreferrer"
          aria-label={post.caption ?? 'Atidaryti Instagram įrašą'}
          className="group relative aspect-square overflow-hidden rounded-3xl bg-neutral-100"
        >
          <Image
            src={getImageUrl(post.imageUrl)}
            alt={post.caption ?? 'Babystep Instagram įrašas'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/0 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

          <span className="absolute right-3 bottom-3 inline-flex size-8 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-sm backdrop-blur">
            <Instagram size={17} aria-hidden="true" />
          </span>
        </a>
      ))}
    </div>
  );
};
