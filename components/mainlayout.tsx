import Head from 'next/head'
import React from 'react'
import { MainProvider } from '../contexts'
import CartProvider from '../contexts/cart-context'
import { Header, Footer } from './index'

const MainLayout: React.FC<any> = (props) => (
  <>
    <Head>
      <title>{props.title}</title>
    </Head>
    <div className="wrapper">
      <MainProvider>
        <CartProvider>
          <Header />
          {props.children}
          <Footer />
        </CartProvider>
      </MainProvider>
    </div>
  </>
)

export default MainLayout