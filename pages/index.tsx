import { FunctionComponent} from 'react'
import { GetServerSideProps } from 'next'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'

interface HomeProps {
  products: any,
  bannerData: any
}

export const Home = ({ products, bannerData }: HomeProps) => {
  return (
  <>
    <HeroBanner heroBanner={} />
    
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className="products-container">
      {products?.map((product: any) => product.name)}
    </div>

    <FooterBanner />
  </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home
