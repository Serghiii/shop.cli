export const cookieName = 'NEXT_LOCALE'

export const i18n = {
	defaultLocale: 'uk',
	defaultLocaleAlias: 'ua', // '' якщо альтернатива відсутня
	locales: ['uk', 'ru'] as const
}

export type Locale = (typeof i18n.locales)[number]
