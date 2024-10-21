"use client";
// app/products/[id]/page.js
import axios from "axios";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { useEffect, useState } from "react";

// A server component, so no useEffect is needed
export default async function ProductDetail({ params }) {
  const { id } = params;

  // Fetch the main product
  const productResponse = await axios.get(
    `https://fakestoreapi.in/api/products/${id}`
  );
  const product = productResponse.data.product;

  // Fetch all products to get related ones
  const allProductsResponse = await axios.get(
    `https://fakestoreapi.in/api/products`
  );
  const allProducts = allProductsResponse.data.products;

  // Filter related products (for example, by category)
  const relatedProducts = allProducts.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <>
      <Header />
      <div className="container my-20 mx-auto p-10">
        <div className="md:flex lg:flex bg-white border-10 border-black p-8 rounded-lg shadow-lg">
          <div>
            <img
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-full transition-all hover:scale-110 object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
            <p className="text-gray-400 font-bold mt-2">${product.price}</p>
            <p className="mt-4">{product.description}</p>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Related Products</h3>
            <div className="flex overflow-x-auto space-x-4">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`} className="min-w-[200px]">
                  <div className="cursor-pointer">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="w-full h-auto object-cover"
                    />
                    <h4 className="mt-2 font-semibold">{relatedProduct.title}</h4>
                    <p className="text-gray-400">${relatedProduct.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
