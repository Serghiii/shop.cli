import { NextRequest, NextResponse } from 'next/server'
import { i18n } from './i18n-config'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'

const cookieName = 'i18n'

const getLocale = (request: NextRequest): string => {
	if (request.cookies.has(cookieName)) {
		let locale = request.cookies.get(cookieName)!.value
		if (i18n.locales.some(locale => locale === locale)) return locale
	}
	const acceptLang = request.headers.get('Accept-Language')
	if (!acceptLang) return i18n.defaultLocale
	const headers = { 'accept-language': acceptLang }
	const languages = new Negotiator({ headers }).languages()
	return match(languages, i18n.locales, i18n.defaultLocale)
}

const pathContains = (pathname: string, locales: string[]) => {
	for (let i in locales) {
		if (pathname.startsWith(`/${locales[i]}/`) || pathname === `/${locales[i]}`) return locales[i]
	}
	if (
		i18n.defaultLocaleAlias.length > 0 &&
		(pathname.startsWith(`/${i18n.defaultLocaleAlias}/`) || pathname === `/${i18n.defaultLocaleAlias}`)
	)
		return i18n.defaultLocaleAlias
	return undefined
}

export function middleware(request: NextRequest) {
	const locale = getLocale(request)
	const { pathname } = request.nextUrl
	const pathlocale = pathContains(pathname, i18n.locales as unknown as string[])

	// Internationalization v2 --->
	if (pathlocale) {
		if (locale !== pathlocale) {
			request.cookies.set(cookieName, pathlocale)
		}
		if (
			pathlocale === i18n.defaultLocale ||
			(i18n.defaultLocaleAlias.length > 0 && pathlocale === i18n.defaultLocaleAlias)
		) {
			return NextResponse.redirect(
				new URL(pathname.replace(`/${pathlocale}`, pathname === `/${pathlocale}` ? '/' : ''), request.url)
			)
		}
	}

	const pathnameIsMissingLocale =
		i18n.locales.every(locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`) &&
		!pathname.startsWith(`/${i18n.defaultLocaleAlias}/`) &&
		pathname !== `/${i18n.defaultLocaleAlias}`

	if (
		pathnameIsMissingLocale &&
		(locale === i18n.defaultLocale || (i18n.defaultLocaleAlias.length > 0 && locale === i18n.defaultLocaleAlias))
	) {
		return NextResponse.rewrite(new URL(`/${i18n.defaultLocale}${pathname}${request.nextUrl.search}`, request.url))
	}
	// Internationalization v2 <---

	// Internationalization v1 --->
	// if (locale === i18n.defaultLocale) {
	// 	// first part
	// 	if (pathlocale) {
	// 		return NextResponse.redirect(
	// 			new URL(pathname.replace(`/${pathlocale}`, pathname === `/${pathlocale}` ? '/' : ''), request.url)
	// 		)
	// 	}
	// } else {
	// 	if (pathlocale && locale !== pathlocale) {
	// 		return NextResponse.redirect(new URL(pathname.replace(`/${pathlocale}`, `/${locale}`), request.url))
	// 	} else if (!pathlocale) {
	// 		return NextResponse.redirect(new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url))
	// 	}
	// }

	// const pathnameIsMissingLocale = i18n.locales.every(
	// 	locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	// )

	// if (pathnameIsMissingLocale && (locale === pathlocale || locale === i18n.defaultLocale)) {
	// 	// second part
	// 	return NextResponse.rewrite(new URL(`/${i18n.defaultLocale}${pathname}${request.nextUrl.search}`, request.url))
	// }
	// Internationalization v1 <---
}

export const config = {
	matcher: ['/((?!_next|favicon.ico).*)']
}
