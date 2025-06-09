import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProductByIdApi } from "../services/allApi";

const sizeChartData = [
  { size: "S", waistIn: "30.0", waistCm: "76.2" },
  { size: "M", waistIn: "32.0", waistCm: "81.3" },
  { size: "L", waistIn: "34.0", waistCm: "86.4" },
  { size: "XL", waistIn: "36.0", waistCm: "91.4" },
  { size: "XXL", waistIn: "38.0", waistCm: "96.5" },
  { size: "3XL", waistIn: "40.0", waistCm: "101.6", disabled: true },
];

const SizeChartDrawer = ({ onClose, id }) => {
  const [unit, setUnit] = useState("in");
  

  return (
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
      <div className="flex items-center justify-end px-6 pt-4">
        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
          <button
            className={`px-3 py-1 rounded-full text-sm font-semibold focus:outline-none transition ${
              unit === "in" ? "bg-[#221f2e] text-white" : "text-gray-700"
            }`}
            onClick={() => setUnit("in")}
          >
            in
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-semibold focus:outline-none transition ${
              unit === "cm" ? "bg-[#221f2e] text-white" : "text-gray-700"
            }`}
            onClick={() => setUnit("cm")}
          >
            cm
          </button>
        </div>
      </div>
      <div className="p-6 pt-2">
        <table className="w-full text-left border-separate" style={{ borderSpacing: "0 10px" }}>
          <thead>
            <tr>
              <th className="pb-2 text-[#221f2e] text-base">Size</th>
              <th className="pb-2 text-[#221f2e] text-base">
                To Fit Waist ({unit})
              </th>
            </tr>
          </thead>
          <tbody>
            {sizeChartData.map((row) => (
              <tr key={row.size} className={row.disabled ? "opacity-50 line-through" : ""}>
                <td className="py-2 font-semibold">{row.size}</td>
                <td className="py-2">
                  {unit === "in" ? row.waistIn : row.waistCm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SizeChartDrawer;
