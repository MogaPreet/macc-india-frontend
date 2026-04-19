'use client';

import DOMPurify from 'isomorphic-dompurify';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

function deltaOpsFromJson(parsed: unknown): unknown[] | null {
  if (Array.isArray(parsed)) return parsed;
  if (
    parsed &&
    typeof parsed === 'object' &&
    'ops' in parsed &&
    Array.isArray((parsed as { ops: unknown }).ops)
  ) {
    return (parsed as { ops: unknown[] }).ops;
  }
  return null;
}

function deltaJsonToHtml(deltaJson: string): string | null {
  const trimmed = deltaJson.trim();
  if (!trimmed) return null;
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    const ops = deltaOpsFromJson(parsed);
    if (!ops) return null;
    const converter = new QuillDeltaToHtmlConverter(ops, {});
    return converter.convert();
  } catch {
    return null;
  }
}

export function ProductDescription({ description }: { description: string | null | undefined }) {
  if (!description?.trim()) return null;
  const htmlFromDelta = deltaJsonToHtml(description);
  const html = htmlFromDelta ?? `<p>${escapeHtml(description)}</p>`;
  return (
    <div
      className="product-description prose dark:prose-invert max-w-none text-gray-600 [&_a]:text-accent-cyan [&_a]:underline"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
