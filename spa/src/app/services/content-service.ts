export function decodeIfEscaped(text: string): string {
  if (!text) return '';

  if (text.includes('&lt;') || text.includes('&gt;')) {
    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
      return text
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&quot;', '"')
        .replaceAll('&#39;', "'")
        .replaceAll('&amp;', '&');
    }

    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent || '';
  }
  return text;
}
