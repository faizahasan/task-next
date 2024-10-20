"use client";
import { getProducts } from '../../lib/api';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const productData = await getProducts(page);
    setProducts(productData);
    console.log(productData); // Log the fetched data directly
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => setPage(prevPage => prevPage + 1);
  const handlePreviousPage = () => setPage(prevPage => Math.max(prevPage - 1, 1)); // Prevent going below page 1

  // Function to limit title to 6 words
  const limitTitle = (title) => {
    const words = title.split(' ');
    return words.length > 6 ? words.slice(0, 6).join(' ') + '...' : title;
  };

  return (
    <>
      <Header />
      <div className="container m-auto flex flex-col">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="m-5 p-2 border rounded"
        />

        <div className="container flex justify-between m-5">
          <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 bg-gray-200 rounded">
            Previous
          </button>
        </div>

        {/* Product Grid */}
        <div className="container m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <a key={product.id} href={`/products/${product.id}`} className="hover:scale-110 transition-all duration-700 m-5 bg-white p-4 rounded-lg shadow-lg">
                <div>
                  <img src={product.image} alt={product.title} className="w-30 h-20 mx-auto" />
                  <h2 className="text-lg font-bold mt-2">{limitTitle(product.title)}</h2>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
              </a>
            ))
          ) : (
            <p className="m-5">No products found.</p> // Handle no products found
          )}
        </div>

        {/* Pagination Controls */}
        <div className="container m-auto flex justify-end">
          <button onClick={handleNextPage} className="m-5 px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
