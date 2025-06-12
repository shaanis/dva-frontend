import React, { useEffect, useState, useRef } from "react";
import { getAllProductsApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  const navigate = useNavigate();
  const containerRef = useRef();

  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    allProducts();
  }, []);

  useEffect(() => {
    applySort();
  }, [products, sortOption]);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".product-card");
    if (!cards) return;
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [sortedProducts, currentPage]);

  const allProducts = async () => {
    setLoading(true);
    try {
      const result = await getAllProductsApi();
      if (result.status >= 200 && result.status < 300) {
        setProducts(result.data);
        console.log(" Products fetched:", result.data);
      }
    } catch (e) {
      console.error(" Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  };

  const applySort = () => {
    let sorted = [...products];
    switch (sortOption) {
      case "priceLowHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "latest":
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        sorted = [...products];
    }
    setSortedProducts(sorted);
    setCurrentPage(1); // Reset page after sort
  };

  const handleNavigate = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className="min-h-screen p-8 bg-[#221f2e] text-white pt-24"
      ref={containerRef}
    >
      {/* Heading and Sort */}
      <div className="flex justify-between sm:flex-row sm:justify-between sm:items-center gap-4 mb-10 text-center sm:text-left  lg:mx-20">
        <h1 className=" text-2xl sm:text-4xl font-bold text-[#ddcb7f]">
          Collection
        </h1>
        <div className="relative w-36 sm:w-44">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none w-full bg-[#2a2a2a] text-[#ddcb7f] border border-[#ddcb7f] px-3 py-2 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-[#ddcb7f] transition duration-200 text-sm shadow-sm"
          >
            <option value="default">Sort</option>
            <option value="priceLowHigh">Low to High</option>
            <option value="priceHighLow">High to Low</option>
            <option value="latest">New Arriavals</option>
          </select>
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-[#ddcb7f]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="border-4 border-t-[#ddcb7f] border-gray-300 rounded-full w-12 h-12 animate-spin" />
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:mx-20 ">
            {currentProducts.map((item, i) => (
              <div
                key={item._id}
                onClick={() => handleNavigate(item._id)}
                className="product-card bg-[#2e2e2e] rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 cursor-pointer hover:scale-[1.02]"
              >
                <div className="overflow-hidden relative">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 text-[#ddcb7f]">
                    {item.name}
                  </h2>
                  <p className="text-lg font-bold mb-4">
                    AED : {item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {sortedProducts.length > productsPerPage && (
            <div className="flex justify-center mt-10 items-center space-x-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="text-white p-3 rounded-full disabled:opacity-40"
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
                className="text-white p-3 rounded-full disabled:opacity-40"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
