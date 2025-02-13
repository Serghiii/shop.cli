export const cookieI18nName = 'NEXT_LOCALE'

export const i18n = {
	defaultLocale: 'uk',
	defaultLocaleAlias: 'ua', // if no alias provided, it will be the same as defaultLocale or ''
	locales: ['uk', 'ru'] as const
}

export type Locale = (typeof i18n.locales)[number]
