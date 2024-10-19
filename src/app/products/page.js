
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
    console.log(products);
  };


  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page - 1);

  return (
    <>
    <Header/>
    <div className=" container m-auto flex flex-col ">
      {/* Search Input */}
      
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="m-5 p-2 border rounded"
      />
      
      <div className=" container flex justify-between m-5">
        <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 bg-gray-200 rounded">
          Previous
        </button>
        
      </div>

      
      {/* Product Grid */}
     
      <div className="container m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {filteredProducts.map(product => (
           <a href={`/products/${product.id}`} className="hover:scale-110 transition-all duration-700 m-5 bg-white p-4 rounded-lg shadow-lg">
          <div key={product.id} >
            <img src={product.image} alt={product.title} className=" w-20 h-20 " />
            <h2 className="text-lg font-bold mt-2">{product.title}</h2>
            <p className="text-sm text-gray-500">${product.price}</p>
          </div>
          </a>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className=" container m-auto flex justify-end ">
        
        <button onClick={handleNextPage} className="m-5 px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
    <Footer/>
    </>
    
  );
}
