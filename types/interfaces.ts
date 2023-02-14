interface sanityBanner {
  buttonText: string;
  desc: string;
  discount: string;
  image: any;
  largeText1: string;
  largeText2: string;
  midText: string;
  product: string;
  saleTime: string;
  smallText: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

interface slug {
  current: string;
  _type: string;
}

interface sanityProduct {
  details: string;
  image: any;
  name: string;
  price: number;
  slug: slug;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}


export type { sanityBanner, sanityProduct };
