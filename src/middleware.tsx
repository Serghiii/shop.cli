import { NextRequest, NextResponse } from "next/server"
import { i18n } from './i18n-config'
import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"

const getLocale = (request: NextRequest): string => {
  let locale = request.cookies.get("NEXT_LOCALE")?.value
  locale = locale ? locale : ''
  if (i18n.locales.some(locale => locale === locale)) return locale
  const acceptLang = request.headers.get("Accept-Language")
  if (!acceptLang) return i18n.defaultLocale
  const headers = { "accept-language": acceptLang }
  const languages = new Negotiator({ headers }).languages()
  return match(languages, i18n.locales, i18n.defaultLocale)
}

const pathContains = (pathname: string, locales: string[]) => {
  for (let i in locales) {
    if (pathname.startsWith(`/${locales[i]}/`) || pathname === `/${locales[i]}`) return locales[i]
  }
  return undefined
}

export function middleware(request: NextRequest) {
  const locale = getLocale(request)
  const { pathname } = request.nextUrl
  const pathlocale = pathContains(pathname, i18n.locales as unknown as string[])

  // Internationalization --->
  if (locale === i18n.defaultLocale) { // first part
    if (pathlocale) {
      return NextResponse.redirect(
        new URL(pathname.replace(`/${pathlocale}`, pathname === `/${pathlocale}` ? "/" : "" ), request.url)
      )
    }
  } else {
    if (pathlocale && locale !== pathlocale) {
      return NextResponse.redirect(
        new URL(pathname.replace(`/${pathlocale}`, `/${locale}`), request.url)
      )
    } else
    if (!pathlocale) {
      return NextResponse.redirect(
        new URL(`/${locale}${pathname}${request.nextUrl.search}`, request.url)
      )
    }
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale && (locale === pathlocale || locale === i18n.defaultLocale)) { // second part
    return NextResponse.rewrite(
      new URL(`/${i18n.defaultLocale}${pathname}${request.nextUrl.search}`, request.url)
    )
  }
  // Internationalization <---

}
 
export const config = {
  matcher: [
    '/((?!_next|favicon.ico).*)',
  ],
}