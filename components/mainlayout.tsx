import Head from 'next/head'
import React from 'react'
import { MainProvider } from '../contexts'
import CartProvider from '../contexts/cart-context'
import { Header, Footer } from './'

const MainLayout: React.FC<any> = (props) => (
  <>
    <Head>
      <title>{props.title}</title>
    </Head>
    <div className="wrapper">
      <CartProvider>
        <MainProvider>
          <Header />
          {props.children}
          <Footer />
        </MainProvider>
      </CartProvider>
    </div>
  </>
)

export default MainLayout