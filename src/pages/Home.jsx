import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { getPrintedProductsApi, getSolidProductsApi } from "../services/allApi";
import About from "./About";

const Home = () => {
  const [selected, setSelected] = useState("printed");
  const [printed, setPrinted] = useState([]);
  const [solid, setSolid] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selected === "printed") {
      getPrintedProducts();
    }
    if (selected === "solid") {
      getSolidProducts();
    }
  }, [selected]);

  const getPrintedProducts = async () => {
    setLoading(true);
    try {
      const result = await getPrintedProductsApi();
      if (result.status >= 200 && result.status < 300) {
        setPrinted(result.data);
      }
    } catch (e) {
      console.error(e);
      setPrinted([]);
    }
    setLoading(false);
  };

  const getSolidProducts = async () => {
    setLoading(true);
    try {
      const result = await getSolidProductsApi();
      if (result.status >= 200 && result.status < 300) {
        setSolid(result.data);
      }
    } catch (e) {
      console.error(e);
      setSolid([]);
    }
    setLoading(false);
  };

  const navigateToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 * i,
        duration: 0.8,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i = 1) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2 * i,
        duration: 0.7,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  return (
    <>
      <div className="flex items-center flex-col pt-16 bg-[#221f2e] min-h-screen pb-5">
        <motion.h2
          className="sm:text-5xl text-[#c9b037] text-4xl mb-5"
          style={{ fontFamily: "Playfair Display, serif" }}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Where Comfort
        </motion.h2>
        <motion.h2
          className="sm:text-5xl text-[#c9b037] text-4xl mb-15"
          style={{ fontFamily: "Playfair Display, serif" }}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Meets Confidence
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
        >
          <Link to={'/shop'} className="btn text-[#c9b037] px-5 py-2 mt-10 border rounded border-[#c9b037] hover:bg-white">
            Shop Now
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-row mt-24 panties-title justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
        >
          <button
            className={`flex-1 py-4 px-6 sm:py-5 sm:px-20 text-xl sm:text-3xl text-[#ddcb7f] focus:outline-none transition-colors rounded whitespace-nowrap ${
              selected === "printed" ? "bg-[#6f2e0b]" : ""
            }`}
            onClick={() => setSelected("printed")}
          >
            Printed Panties
          </button>

          <button
            className={`flex-1 py-4 px-6 sm:py-5 sm:px-20 text-xl sm:text-3xl text-[#ddcb7f] focus:outline-none transition-colors rounded ${
              selected === "solid" ? "bg-[#6f2e0b]" : ""
            }`}
            onClick={() => setSelected("solid")}
          >
            Solid Panties
          </button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full max-w-6xl px-4 mb-15">
          {selected === "printed" ? (
            // loading
            loading ? (
              <div className="col-span-full flex justify-center items-center py-10">
                <svg
                  className="animate-spin h-8 w-8 text-[#F5DEB3]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              </div>
            ) : printed.length === 0 ? (
              <p className="text-white col-span-full text-center">
                No products found
              </p>
            ) : (
              printed.map((product, i) => (
                <motion.div
                  onClick={() => navigateToDetail(product._id)}
                  key={product._id || i}
                  className="text-white w-full max-w-[300px] sm:max-w-full mx-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                  variants={imageVariant}
                  initial="hidden"
                  animate="visible"
                  custom={i + 1}
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  <img
                    className="w-[250px] h-[250px] object-cover mb-2"
                    src={
                      product.image?.[0] ||
                      product.image ||
                      "https://via.placeholder.com/300"
                    }
                    alt={product.name || "Product image"}
                  />
                  <p>{product?.name}</p>
                  <p>${product.price?.toFixed(2) || "N/A"}</p>
                </motion.div>
              ))
            )
          ) : loading ? (
            <div className="col-span-full flex justify-center items-center py-10">
                <svg
                  className="animate-spin h-8 w-8 text-[#F5DEB3]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              </div>
          ) : solid.length === 0 ? (
            <p className="text-white col-span-full text-center">
              No products found
            </p>
          ) : (
            solid.map((product, i) => (
              <motion.div
                onClick={() => navigateToDetail(product._id)}
                key={product._id || i}
                className="text-white w-full max-w-[300px] sm:max-w-full mx-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                variants={imageVariant}
                initial="hidden"
                animate="visible"
                custom={i + 1}
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                <img
                  className="w-[250px] h-[250px] object-cover mb-2"
                  src={
                    product.image?.[0] ||
                    product.image ||
                    "https://via.placeholder.com/300"
                  }
                  alt={product.name || "Product image"}
                />
                <p>{product?.name}</p>
                <p>${product.price?.toFixed(2) || "N/A"}</p>
              </motion.div>
            ))
          )}
        </div>

        <motion.h1
          className="text-3xl text-[#ddcb7f] mt-8"
          style={{ fontFamily: "Playfair Display, serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, type: "spring" }}
        >
          WHY DVA
        </motion.h1>
        <motion.p
          className="text-white text-md my-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, type: "spring" }}
        >
          Quality. Comfort. Elegance.
        </motion.p>

        <About />
      </div>
    </>
  );
};

export default Home;
