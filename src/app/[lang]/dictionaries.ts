import 'server-only'
import { Locale } from '../../i18n-config'

const dictionaries = {
	uk: () => import('./uk.json').then(module => module.default),
	ru: () => import('./ru.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
