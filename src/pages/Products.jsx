import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProductsApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";

// Dummy product data
const products = [
  {
    id: 1,
    name: "Jordon Retro 6 G",
    price: 1965,
    image: "https://m.media-amazon.com/images/I/61ROnN-kfaL._SX679_.jpg",
  },
  {
    id: 2,
    name: "Jordon Retro 7",
    price: 2150,
    image: "https://m.media-amazon.com/images/I/61wCa5W2hQL._SX679_.jpg",
  },
  {
    id: 3,
    name: "Classic Running Shoe",
    price: 1450,
    image: "/shoe3.jpg",
  },
  {
    id: 4,
    name: "Sporty Sneaker",
    price: 1800,
    image: "/shoe4.jpg",
  },
  {
    id: 5,
    name: "Casual Leather Shoe",
    price: 2200,
    image: "/shoe5.jpg",
  },
];

// // Size chart data
// const sizeChartData = [
//   { size: "S", waist: "30.0" },
//   { size: "M", waist: "32.0" },
//   { size: "L", waist: "34.0" },
//   { size: "XL", waist: "36.0" },
//   { size: "XXL", waist: "38.0" },
//   { size: "3XL", waist: "40.0", disabled: true },
// ];

// Size chart drawer component
const SizeChartDrawer = ({ onClose }) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl"
    style={{ color: "#221f2e" }}
  >
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <span className="text-xl font-bold text-[#ddcb7f]">Size Chart</span>
      <button
        onClick={onClose}
        className="text-2xl font-bold text-gray-500 hover:text-[#ddcb7f] transition"
      >
        &times;
      </button>
    </div>
    <div className="p-6">
      <table className="w-full text-left border-separate" style={{ borderSpacing: "0 10px" }}>
        <thead>
          <tr>
            <th className="pb-2 text-[#221f2e] text-base">Size</th>
            <th className="pb-2 text-[#221f2e] text-base">To Fit Waist (in)</th>
          </tr>
        </thead>
        <tbody>
          {sizeChartData.map((row) => (
            <tr key={row.size} className={row.disabled ? "opacity-50 line-through" : ""}>
              <td className="py-2 font-semibold">{row.size}</td>
              <td className="py-2">{row.waist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

// Main product page
const Products = () => {
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    allProducts()
  },[])

  const allProducts =async()=>{
    try {
      const result = await getAllProductsApi()
      if(result.status >= 200 && result.status < 300){
        setProducts(result.data)
        console.log("Products fetched successfully:", result.data);
        
      }
    } catch (e) {
      console.log(e);
      
    }
  }

  const handleNavigate=(id)=>{
    navigate(`/detail/${id}`);
  }


  return (
    <>
      <motion.div
        className="min-h-screen p-8 bg-[#221f2e] text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Heading and size chart button */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-[#ddcb7f]">Collection</h1>
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((item,i) => (
            <motion.div
              key={item._id}
              onClick={()=>handleNavigate(item._id)}
              className="bg-[#2e2e2e] rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300"
            >
              <motion.img
                src={item.image[0]}
                alt={name}
                className="w-full h-48 object-contain bg-white transition-transform duration-300 ease-in-out hover:scale-105"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.1 * i,
                  duration: 0.5,
                  type: "spring",
                }}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2 text-[#ddcb7f]">{item.name}</h2>
                <p className="text-lg font-bold mb-4">₹ {item.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Size Chart Drawer with Overlay
      <AnimatePresence>
        {showSizeChart && (
          <>
            <SizeChartDrawer onClose={() => setShowSizeChart(false)} />
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeChart(false)}
            />
          </>
        )}
      </AnimatePresence> */}
    </>
  );
};

export default Products;
