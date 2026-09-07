import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import enMessages from '../../messages/en.json';

function deepMerge(
  base: Record<string, unknown>,
  override: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const overrideVal = override[key];
    const baseVal = base[key];
    if (
      overrideVal !== null &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal) &&
      baseVal !== null &&
      typeof baseVal === 'object' &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      );
    } else if (overrideVal !== undefined) {
      result[key] = overrideVal;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  let messages = enMessages;
  if (locale !== 'en') {
    try {
      const targetMessages = (await import(`../../messages/${locale}.json`)).default;
      messages = deepMerge(
        enMessages as Record<string, unknown>,
        targetMessages as Record<string, unknown>
      ) as typeof enMessages;
    } catch (e) {
      console.error(`Failed to load messages for locale "${locale}", falling back to English`, e);
      messages = enMessages;
    }
  }

  return {
    locale,
    messages
  };
});
