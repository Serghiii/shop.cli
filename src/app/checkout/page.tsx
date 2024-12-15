'use client'
import { SimpleLayout, MainCheckout } from "../../components"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux"
// import { useTranslation } from "./translatation"
import { useRouter } from "next/navigation"

export default function Checkout () {
   const [showing, setShowing] = useState(false)
   const router = useRouter()
   // const { t } = useTranslation()
   const cart = useAppSelector((state: any) => state.cart)

   useEffect(() => {
      setShowing(true)
   }, [])

   if (!showing) return null

   if (showing && cart.cart.length == 0) {
      router.push('/')
      return (<></>)
   }

   return (
      <SimpleLayout title={'undefined'/*t('title')*/} footer={true} >
         <MainCheckout />
      </SimpleLayout >
   )
}