'use client'
import { useRouter } from "next/router"
import { SimpleLayout } from "../components"
import { translate } from "../locales/translate"
import { MainCheckout } from "../components"
import { useEffect, useState } from "react"
import { useAppSelector } from "../redux"

const Checkout: React.FC = () => {
   const [showing, setShowing] = useState(false)
   const router = useRouter()
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
      <SimpleLayout title={translate('title', router.locale)} footer={true} >
         <MainCheckout />
      </SimpleLayout >
    )
  }

export default Checkout