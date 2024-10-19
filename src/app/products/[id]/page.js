
// app/products/[id]/page.js
import axios from "axios";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// A server component, so no useEffect is needed
export default async function ProductDetail({ params }) {
  console.log(params);
  const { id } = params;

  const response = await axios.get(
    `https://fakestoreapi.in/api/products/${id}`
  );
  const product = response.data.product;

  return (
    <>
      <Header />
      <div className=" container my-20 mx-auto p-10">
        <div className="md:flex lg:flex bg-white border-10 border-black p-8 rounded-lg shadow-lg">
          <div>
          <img
            src={product.image}
            alt={product.title}
            className=" w-full h-full transition-all hover:scale-110 object-contain"
          />
          </div>
          <div>
          <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
          <p className="text-gray-400 font-bold mt-2">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
