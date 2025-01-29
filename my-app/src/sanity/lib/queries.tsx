import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "product"] {
    title,
    description,
   "image": productImage.asset,
    price,
    tags,
    discountPercentage,
    isNew
  }`;
