import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import SizeChartDrawer from "../components/SizeChartDrawer";
import { getProductByIdApi } from "../services/allApi";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [formTouched, setFormTouched] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
    if (id) fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true); // start loader
    try {
      const result = await getProductByIdApi(id);
      if (result.status >= 200 && result.status < 300) {
        const data = result.data;
        setProduct(data);
        if (data.image && data.image.length > 0) {
          setMainImage(data.image[0]);
        }
      }
    } catch (e) {
      console.log("Error fetching product:", e);
    }
    setLoading(false); // stop loader
  };

  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];
  const colors = [
    { name: "Black", value: "#222" },
    { name: "White", value: "#fff" },
    { name: "Red", value: "#e11d48" },
    { name: "Blue", value: "#2563eb" },
    { name: "Green", value: "#22c55e" },
  ];

  const availableSizes = product?.availableSizes || sizes;
  const availableColors = product?.availableColors || colors.map((c) => c.value);

  const selectedColorName = colors.find((c) => c.value === selectedColor)?.name || "";

  const showTempMessage = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3000);
  };

  const handleSizeClick = (size) => {
    if (!availableSizes.includes(size)) {
      showTempMessage(`Size ${size} is not available`);
      return;
    }
    setSelectedSize(size);
  };

  // const handleColorClick = (color) => {
  //   if (!availableColors.includes(color)) {
  //     const colorName = colors.find((c) => c.value === color)?.name || "This color";
  //     showTempMessage(`${colorName} color is not available`);
  //     return;
  //   }
  //   setSelectedColor(color);
  // };

  const handleBuyNow = () => {
    setFormTouched(true);
    if (!selectedSize ) return;
    const message = `Hi, I'm interested in buying:\nProduct: ${product.name}\nColor: ${selectedColorName}\nSize: ${selectedSize}\nImage: ${mainImage}`;
    const url = `https://wa.me/917356379172?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Loader UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212]">
        <svg
          className="animate-spin h-12 w-12 text-[#ddcb7f] mb-4"
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
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <div className="text-white text-lg">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-white text-center mt-20">Product not found.</div>;
  }

  return (
    <>
      <motion.div
        className="min-h-screen bg-[#121212] p-4 md:p-6 flex flex-col md:flex-row justify-center items-center md:gap-10 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: showSizeChart ? 0.3 : 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Images */}
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start w-full md:w-auto">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-sm h-[300px] md:h-[400px] overflow-hidden flex items-center justify-center rounded-lg shadow-md">
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImage}
                src={mainImage}
                alt="Product"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              />
            </AnimatePresence>
          </div>
          <div className="flex md:flex-col gap-2 mt-4 md:mt-0 w-full justify-center md:w-auto">
            {product.image?.map((src, index) => (
              <motion.img
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
                key={index}
                src={src}
                alt={`thumb-${index}`}
                className="w-14 h-14 object-cover border rounded cursor-pointer"
                onClick={() => setMainImage(src)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          className="w-full max-w-md text-white"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            {product.name}
          </h2>
          <p className="text-sm md:text-base">{product.description}</p>
          <p className="text-lg font-semibold mt-3">MRP: ₹ {product.price}</p>
          <p className="text-sm mb-4">Inclusive of all taxes</p>

          {/* Size */}
          <div className="mb-4">
            <div className="flex items-center gap-x-10">
              <h3 className="text-lg font-semibold">select size</h3>
              <button
                className="text-rose-400 text-lg font-semibold"
                onClick={() => setShowSizeChart(true)}
              >
                size chart <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => {
                const isAvailable = availableSizes.includes(size);
                return (
                  <motion.button
                    whileTap={{ scale: isAvailable ? 0.95 : 1 }}
                    key={size}
                    onClick={() => handleSizeClick(size)}
                    disabled={!isAvailable}
                    className={`px-4 py-2 text-sm border rounded ${
                      selectedSize === size
                        ? "border-[#ddcb7f] bg-black text-white"
                        : isAvailable
                        ? "border-gray-300 hover:bg-gray-100 cursor-pointer"
                        : "border-gray-400 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {size}
                  </motion.button>
                );
              })}
            </div>
            {!selectedSize && formTouched && (
              <p className="text-sm text-red-500 mt-1">Size selection is required.</p>
            )}
          </div>

          {/* Color */}
          {/* <div className="mb-6 flex flex-col">
            <h3 className="text-md font-semibold mb-2">Color</h3>
            <div className="flex gap-4">
              {colors.map((color) => {
                const isAvailable = availableColors.includes(color.value);
                return (
                  <button
                    key={color.value}
                    onClick={() => handleColorClick(color.value)}
                    disabled={!isAvailable}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      selectedColor === color.value
                        ? "border-[#ddcb7f] scale-110"
                        : isAvailable
                        ? "border-gray-300 cursor-pointer"
                        : "border-gray-400 cursor-not-allowed opacity-50"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  >
                    {selectedColor === color.value && (
                      <span className="block w-3 h-3 rounded-full border-2 border-white bg-white opacity-60"></span>
                    )}
                  </button>
                );
              })}
            </div>
            {!selectedColor && formTouched && (
              <p className="text-sm text-red-500 mt-2">Color selection is required.</p>
            )}
          </div> */}

          {/* Temporary message for unavailable clicks */}
          {msg && (
            <p className="text-yellow-400 font-semibold mb-4 select-none">{msg}</p>
          )}

          {/* Buy Button */}
          <div className="flex mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-white border text-black px-16 py-3 rounded-lg font-semibold shadow hover:bg-[#ddcb7f] transition disabled:opacity-60"
              onClick={handleBuyNow}
            >
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Size Chart Drawer */}
      <AnimatePresence>
        {showSizeChart && (
          <>
            <SizeChartDrawer id={id} onClose={() => setShowSizeChart(false)} />
            <motion.div
              className="fixed inset-0 bg-black z-40 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetail;
