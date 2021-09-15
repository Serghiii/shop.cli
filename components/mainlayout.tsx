import Head from 'next/head'
import React from 'react'
import { MainProvider } from '../contexts'
import { Header, Footer } from './'

const MainLayout: React.FC<any> = (props) => (
  <>
    <Head>
      <title>{props.title}</title>
    </Head>
    <div className="wrapper">
      <MainProvider>
        <Header />
        {props.children}
        <Footer />
      </MainProvider>
    </div>
  </>
)

export default MainLayout