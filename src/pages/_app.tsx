import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../../component/Layout/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function App({ Component, pageProps }: AppProps) {
  return (

    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        theme="light"
      />

      <Component {...pageProps} />
    </Layout>
  )
}
