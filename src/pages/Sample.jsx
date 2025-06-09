import React from "react";
import { motion } from "framer-motion";

const Sample = () => {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-black text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold max-w-4xl text-center leading-tight"
        >
          We invest in companies that are reshaping the future
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl max-w-2xl text-center"
        >
          Drive Capital backs visionary founders building transformative technology companies.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 px-8 py-3 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Learn More
        </motion.button>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center px-6 md:px-20 py-20 gap-10 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Our Approach</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We focus on partnering with entrepreneurs who are disrupting traditional industries with breakthrough technologies and innovative business models.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://drivecapital.com/wp-content/uploads/2022/07/approach-illustration.svg"
            alt="Approach Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="bg-gray-100 py-20 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12">Portfolio Companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sample logos */}
          {[
            "https://drivecapital.com/wp-content/uploads/2022/07/company-logo-1.png",
            "https://drivecapital.com/wp-content/uploads/2022/07/company-logo-2.png",
            "https://drivecapital.com/wp-content/uploads/2022/07/company-logo-3.png",
            "https://drivecapital.com/wp-content/uploads/2022/07/company-logo-4.png",
          ].map((logo, i) => (
            <img key={i} src={logo} alt={`Company logo ${i + 1}`} className="mx-auto h-16 object-contain" />
          ))}
        </div>
      </section>

      {/* Contact Call-to-Action */}
      <section className="bg-black text-white text-center py-16 px-6">
        <h3 className="text-2xl font-semibold mb-4">Ready to build the future with us?</h3>
        <button className="px-8 py-3 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default Sample;
