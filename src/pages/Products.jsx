import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllProductsApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8;
  const navigate = useNavigate();

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    allProducts();
  }, []);

  const allProducts = async () => {
    setLoading(true);
    try {
      const result = await getAllProductsApi();
      if (result.status >= 200 && result.status < 300) {
        setProducts(result.data);
        console.log("✅ Products fetched successfully:", result.data);
      }
    } catch (e) {
      console.error("❌ Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <motion.div
      className="min-h-screen p-8 bg-[#221f2e] text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-[#ddcb7f]">Collection</h1>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="border-4 border-t-[#ddcb7f] border-gray-300 rounded-full w-12 h-12 animate-spin" />
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentProducts.map((item, i) => (
              <motion.div
                key={item._id}
                onClick={() => handleNavigate(item._id)}
                className="bg-[#2e2e2e] rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 cursor-pointer"
              >
                <motion.img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-48 object-cover bg-white transition-transform duration-300 ease-in-out hover:scale-105"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.1 * i,
                    duration: 0.5,
                    type: "spring",
                  }}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 text-[#ddcb7f]">
                    {item.name}
                  </h2>
                  <p className="text-lg font-bold mb-4">
                    AED : {item.price.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {products.length > productsPerPage && (
            <div className="flex justify-center mt-10 items-center space-x-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ cursor: "pointer" }}
                className=" text-white p-3 rounded-full disabled:opacity-40  "
              >
                <i className="fas fa-arrow-left"></i>
              </button>

              <span className="text-lg font-semibold text-white">
                {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className=" text-white p-3 rounded-full disabled:opacity-40 "
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Products;
