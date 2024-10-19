import axios from 'axios';

export async function getProducts(page = 1) {
  // const response = await axios.get(`https://fakestoreapi.com/products?limit=12&page=${page}`);
  const response = await axios.get(`https://fakestoreapi.in/api/products?page=${page}&limit=12`);
  console.log(response.data.products);
  return response.data.products;
}
