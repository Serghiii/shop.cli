'use client'
// import Head from 'next/head'
import { MainProvider } from '../contexts'
import { Header, Footer } from '.'
// import { translate } from '../locales/translate';
// import { useRouter } from 'next/router';

const MainLayout: React.FC<any> = (props) => {
  // const { locale } = useRouter()

  return (
    <>
      {/* <Head>
        <title>{'undefined'translate('title', locale)}</title>
      </Head> */}
      <div className="wrapper">
        <MainProvider>
          <Header />
            {props.children}
          <Footer />
        </MainProvider>
      </div>
    </>
  )
}

export default MainLayout