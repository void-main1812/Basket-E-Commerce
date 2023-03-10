import React from 'react'
import { client, Client } from '../lib/client';

import { Product, SaleBanner, HeroBanner } from '../components'

const Home = ({ product, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading' >
        <h2>Best Selling Products</h2>
        <p>Speakers of Many Variations</p>
      </div>
      <div className='products-container' >
        {product?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <SaleBanner saleBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const product = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { product, bannerData }
  }
}

export default Home
