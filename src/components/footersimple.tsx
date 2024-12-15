'use client'
// import { translate } from '../locales/translate';
// import { useRouter } from "next/router"

const FooterSimple: React.FC = () => {
   // const { locale } = useRouter()
   return (
      <footer>
         <div className="wraper-footer-simple">
            <div className="container-simple">
               <div className="footer-simple">
                  <p>{/*translate('footer.title', locale)*/'undefined'}</p>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterSimple