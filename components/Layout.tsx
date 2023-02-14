import Head from "next/head"
import Footer from "./Footer"

import Navbar from "./Navbar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children}: LayoutProps) => {
  return (
    <div className="layout">
      <Head>
        <title>JS Mastery Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout