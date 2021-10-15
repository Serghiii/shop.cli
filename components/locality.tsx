import { translate } from '../locales/translate';
import { useRouter } from "next/router"

const Locality: React.FC = () => {
   const { locale } = useRouter()
   return (
      <div className="locality">
         <span className="locality__label">{translate('locality', locale)}</span>
         <span className="locality__link">Ковель</span>
      </div>
   )
}

export default Locality