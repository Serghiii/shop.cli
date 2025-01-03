export const i18n = {
	defaultLocale: 'uk',
	defaultLocaleAlias: 'ua', // порожня '' якщо альтернатива відсутня
	locales: ['uk', 'ru'] as const
}

export type Locale = (typeof i18n.locales)[number]
