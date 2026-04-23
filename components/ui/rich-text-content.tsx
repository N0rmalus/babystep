'use client';

import { useMemo } from 'react';
import createDOMPurify from 'dompurify';
import useMounted from '@/hooks/use-mounted';
import { normalizeRichTextContent } from '@/lib/rich-text';
import { cn } from '@/lib/utils';

type Props = {
  content?: string | null;
  className?: string;
};

export const RichTextContent = ({ content, className }: Props) => {
  const isMounted = useMounted();
  const sanitizedContent = useMemo(
    () => {
      const normalizedContent = normalizeRichTextContent(content);

      if (!isMounted) {
        return '';
      }

      const DOMPurify = createDOMPurify(window);

      return DOMPurify.sanitize(normalizedContent, {
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'h2', 'h3'],
        ALLOWED_ATTR: [],
      }).trim();
    },
    [content, isMounted],
  );

  if (!sanitizedContent) {
    return null;
  }

  return <div className={cn('rich-text-content', className)} dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};
