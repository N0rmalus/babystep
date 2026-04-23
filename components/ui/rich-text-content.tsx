'use client';

import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { normalizeRichTextContent } from '@/lib/rich-text';
import { cn } from '@/lib/utils';

type Props = {
  content?: string | null;
  className?: string;
};

export const RichTextContent = ({ content, className }: Props) => {
  const sanitizedContent = useMemo(
    () =>
      DOMPurify.sanitize(normalizeRichTextContent(content), {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'h2', 'h3'],
        ALLOWED_ATTR: [],
      }).trim(),
    [content],
  );

  if (!sanitizedContent) {
    return null;
  }

  return <div className={cn('rich-text-content', className)} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
