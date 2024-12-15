'use client'
import { useRouter } from "next/router"
import { translate } from "../locales/translate"
import { useCallback } from "react";
import { Url } from "next/dist/shared/lib/router/router";

export function useTranslation() {
  const router = useRouter()

  const t = useCallback((str: string) => translate(str, router.locale), [router.locale])
  const setLocale = useCallback((locale: string) => router.push(router.asPath, router.asPath, { locale }), [router.asPath])
  const replace = (str: Url, as?:Url, opt?:any) => router.replace(str,as,opt)

  return { t, locale: router.locale, setLocale, replace }
}