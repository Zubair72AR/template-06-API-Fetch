"use client";

import { useEffect, useState } from "react";
import { Product } from "../../types/products";
import { client } from "@/sanity/lib/client";
import { allProducts } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function OurProducts() {
  // Storing Data in the UseState Hook from Sanity CMS
  const [products, setProducts] = useState<Product[]>([]);
  // Use State for Error Handling
  const [error, setError] = useState<string | null>(null);
  // Use State for Loading Text Display
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch and Store Data from Sanity
  // All Products Data Fetching from Sanity
  useEffect(() => {
    const getProducts = async () => {
      try {
        // Fetching Data
        const fetchedProducts: Product[] = await client.fetch(allProducts);
        // Store Data in the useState
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products ❌");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    getProducts();
  }, []);

  return (
    <div className="px-6 md:px-8 lg:px-16 2xl:px-24">
      {/* Heading */}
      <h2>Our Products</h2>
      {loading ? ( // Show Loading State
        <div className="w-full grid place-items-center my-10 gap-y-6">
          {/* Loading Image */}
          <Image
            src="/Loading.svg"
            alt="Loading Icon"
            width={200}
            height={200}
            className="rotate-clock w-12 h-12 md:w-16 md:h-16 dark:opacity-50"
          />
          {/* Loading Text */}
          <p className="font-semibold md:text-xl">Loading products . . .</p>
        </div>
      ) : (
        <>
          {/* If not Fetched Data Then Show Error */}
          {error ? (
            <p className="font-bold text-2xl text-red-700 grid place-items-center h-32 col-span-2">
              {error}
            </p>
          ) : (
            // If Fetched Data Then Show Products
            <div>
              {products.slice(0, 30).map((product) => {
                // Check if the product has an image
                const imageUrl = product.image
                  ? urlFor(product.image).url()
                  : "/Placeholder.svg";
                console.log(product.image);
                return (
                  <div>
                    <p>{product.title}</p>
                    <p>{product.description}</p>
                    <p>{product.discountPercentage}</p>
                    <p>{product.isNew}</p>
                    <p>{product.price}</p>
                    <p>
                      {product.tags.map((val) => (
                        <span>{val},</span>
                      ))}
                    </p>

                    <Image
                      src={imageUrl}
                      alt={product.title}
                      width={600}
                      height={600}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
