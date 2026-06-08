export type InstagramPost = {
  id: string;
  caption: string | null;
  imageUrl: string;
  permalink: string;
};

type InstagramMediaChild = {
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
};

type InstagramMediaNode = InstagramMediaChild & {
  id?: string;
  caption?: string;
  permalink?: string;
  timestamp?: string;
  children?: {
    data?: InstagramMediaChild[];
  };
};

type InstagramMediaResponse = {
  data?: InstagramMediaNode[];
};

const DEFAULT_POST_LIMIT = 6;
const INSTAGRAM_API_VERSION = 'v24.0';

const getMediaImageUrl = (media: InstagramMediaNode) => {
  if (media.media_type === 'VIDEO') {
    return media.thumbnail_url ?? media.media_url;
  }

  if (media.media_url) {
    return media.media_url;
  }

  const firstChildWithImage = media.children?.data?.find((child) => child.media_url || child.thumbnail_url);

  if (!firstChildWithImage) {
    return null;
  }

  if (firstChildWithImage.media_type === 'VIDEO') {
    return firstChildWithImage.thumbnail_url ?? firstChildWithImage.media_url ?? null;
  }

  return firstChildWithImage.media_url ?? firstChildWithImage.thumbnail_url ?? null;
};

const normalizeInstagramPost = (media: InstagramMediaNode): InstagramPost | null => {
  const imageUrl = getMediaImageUrl(media);

  if (!media.id || !imageUrl || !media.permalink) {
    return null;
  }

  return {
    id: media.id,
    caption: media.caption ?? null,
    imageUrl,
    permalink: media.permalink,
  };
};

export const getInstagramPosts = async (limit = DEFAULT_POST_LIMIT): Promise<InstagramPost[]> => {
  const requestUrl = new URL(
    `https://graph.facebook.com/${INSTAGRAM_API_VERSION}/${process.env.INSTAGRAM_USER_ID}/media`,
  );
  requestUrl.searchParams.set(
    'fields',
    'id,caption,media_type,media_url,thumbnail_url,permalink,children{media_type,media_url,thumbnail_url}',
  );
  requestUrl.searchParams.set('limit', String(limit));
  requestUrl.searchParams.set('access_token', process.env.INSTAGRAM_ACCESS_TOKEN ?? '');

  try {
    const response = await fetch(requestUrl, {
      next: {
        revalidate: 60 * 60,
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as InstagramMediaResponse;

    if (!Array.isArray(payload.data)) {
      return [];
    }

    return payload.data.map(normalizeInstagramPost).filter((post): post is InstagramPost => Boolean(post));
  } catch {
    return [];
  }
};
