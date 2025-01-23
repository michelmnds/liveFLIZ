import { match } from '@formatjs/intl-localematcher';
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers as nextHeaders } from 'next/headers';

// Helper function to normalize locales
function normalizeLocale(locale: string): string {
  // Convert any variant of a language to its base form
  return locale.toLowerCase().split('-')[0];
}

// Function to parse the Accept-Language header
function parseAcceptLanguage(header: string): string[] {
  return header
    .split(',')
    .map(lang => {
      const [locale] = lang.split(';');
      return locale.trim();
    })
    .filter(Boolean);
}

export default getRequestConfig(async () => {
  const locales = ['de', 'en'];
  let languages: string[] = [];
  const defaultLocale = 'de';

  // Suggest to use client language cookie for user's language preference
  let langCookie = (await cookies()).get('lang')?.value;

  // If no language cookie is set, use the Accept-Language header
  if (!langCookie) {
    const headers = {
      'accept-language': (await nextHeaders()).get('accept-language') || 'de'
    };
    languages = parseAcceptLanguage(headers['accept-language']);
  }

  langCookie = 'en'; // TODO: REMOVE THIS LATER!

  // Prioritize the language cookie over the Accept-Language header
  languages = (langCookie ? [langCookie] : languages)
    .map(normalizeLocale) // Normalize languages before using them
    .filter(lang => locales.includes(lang));

  const locale = match(locales, languages, defaultLocale);

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  };
});
