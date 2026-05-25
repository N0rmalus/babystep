import { IMAGE_PLACEHOLDER_URL } from '@/lib/consts';

export const getImageUrl = (imageUrl?: string | null) => {
  const normalizedImageUrl = imageUrl?.trim();

  return normalizedImageUrl ? normalizedImageUrl : IMAGE_PLACEHOLDER_URL;
};
