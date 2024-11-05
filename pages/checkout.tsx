'use client'
import { useRouter } from "next/router"
import { SimpleLayout } from "../components"
import { translate } from "../locales/translate"
import { MainCheckout } from "../components"

const Checkout: React.FC = () => {
    const router = useRouter()
    
    return (
        <SimpleLayout title={translate('title', router.locale)} footer={true} >
           <MainCheckout />
        </SimpleLayout >
     )
  }

export default Checkout