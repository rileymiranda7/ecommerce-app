import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { StateContextProvider } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'

import { Layout } from '@/components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContextProvider>
  )
}
