import { FunctionComponent} from 'react'
import { GetServerSideProps } from 'next'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '../components'
import type { sanityBanner, sanityProduct } from '@/types/interfaces'

interface HomeProps {
  products: sanityProduct[],
  bannerData: sanityBanner[]
}

export const Home = ({ products, bannerData }: HomeProps) => {
  return (
  <>
    <HeroBanner heroBanner={bannerData[0]} />
    
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className="products-container">
      {products?.map((product: sanityProduct) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData[0]}/>
  </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products: sanityProduct[] = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData: sanityBanner[] = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home
