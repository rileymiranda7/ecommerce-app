import { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'

import type { sanityProduct } from '@/types/interfaces';
import { Product } from "../../components"
import { useStateContext } from '../../context/StateContext'

interface ProductDetailsProps {
  product: sanityProduct
  products: sanityProduct[]
}

export const ProductDetails = ({ product, products }: ProductDetailsProps) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty } = useStateContext();

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img 
              src={urlFor(image && image[index]).url()}
              className="product-detail-image"
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item: any, i: number) => (
              <img
              key={i}
                src={urlFor(item).url()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus'>
                <AiOutlineMinus />
              </span>
              <span className='num'>
                0
              </span>
              <span className='plus'>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart'>Add to Cart</button>
            <button type='button' className='buy-now'>Buy Now</button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }` 

  const products = await client.fetch(query);

  const paths = await products.map((product: sanityProduct) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const query = `*[_type == "product" && slug.current == '${context?.params?.slug}'][0]`;
  const productsQuery = '*[_type == "product"]'

  const product: sanityProduct = await client.fetch(query);
  const products: sanityProduct[] = await client.fetch(productsQuery)

  return {
    props: { products, product }
  }
}

export default ProductDetails