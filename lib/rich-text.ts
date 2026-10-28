const HTML_TAG_PATTERN = /<\/?[a-z][\s\S]*>/i;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const HTML_ENTITIES = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
} satisfies Record<string, string>;

export const toPlainText = (value?: string | null) => {
  if (!value) {
    return '';
  }

  const withoutTags = value.replace(/<[^>]*>/g, ' ');
  const decoded = Object.entries(HTML_ENTITIES).reduce(
    (text, [entity, character]) => text.replaceAll(entity, character),
    withoutTags,
  );

  return decoded.replace(/\s+/g, ' ').trim();
};

export const normalizeRichTextContent = (value?: string | null) => {
  if (!value?.trim()) {
    return '';
  }

  if (HTML_TAG_PATTERN.test(value)) {
    return value;
  }

  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('');
};
