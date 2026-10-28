import { Instagram } from 'lucide-react';
import Image from 'next/image';

import type { InstagramPost } from '@/actions/get-instagram-posts';
import { HomeSection } from '@/app/(routes)/components/home-section';
import Button from '@/components/ui/button';
import { getImageUrl } from '@/lib/image-url';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '@/lib/consts';

type Props = {
  posts: InstagramPost[];
};

const VISIBLE_POST_COUNT = 4;

export const InstagramSection = ({ posts }: Props) => {
  const visiblePosts = posts.slice(0, VISIBLE_POST_COUNT);

  if (visiblePosts.length === 0) {
    return null;
  }

  return (
    <HomeSection labelledBy="home-instagram" className="pt-14 lg:pt-28">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:gap-6">
        <div className="flex items-end justify-between gap-3 lg:w-65 lg:shrink-0 lg:flex-col lg:items-start lg:justify-center">
          <div className="flex flex-col gap-1 lg:gap-3">
            <p className="eyebrow text-link">Instagram</p>
            <h2 id="home-instagram" className="font-accent text-2xl leading-tight font-bold text-balance lg:text-3xl">
              Mažos akimirkos<span className="hidden lg:inline">, tikri namai</span>
            </h2>
            <p className="text-ink-muted hidden text-sm leading-relaxed lg:block">
              Pažymėk @{INSTAGRAM_HANDLE} ir pasidalink savo miego kampeliu.
            </p>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="text-link flex min-h-11 items-center text-sm font-semibold lg:hidden"
          >
            @{INSTAGRAM_HANDLE}
          </a>
          <div className="hidden lg:block">
            <Button
              href={INSTAGRAM_URL}
              variant="secondary"
              size="sm"
              label={`Sek @${INSTAGRAM_HANDLE}`}
              elementBefore={<Instagram size={16} />}
              className="h-11"
            />
          </div>
        </div>

        <div className="scrollbar-none -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-1 lg:gap-6 lg:overflow-visible lg:p-0">
          {visiblePosts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              aria-label={post.caption ?? 'Atidaryti Instagram įrašą'}
              className="border-line bg-muted hover:border-line-strong relative aspect-4/5 w-37 shrink-0 overflow-hidden rounded-3xl border transition duration-200 hover:-translate-y-0.5 lg:w-auto lg:flex-1"
            >
              <Image
                src={getImageUrl(post.imageUrl)}
                alt=""
                fill
                sizes="(min-width: 1024px) 240px, 148px"
                className="object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </HomeSection>
  );
};
