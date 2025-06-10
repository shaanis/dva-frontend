import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

const InTouch = () => {
  return (
    <>
      {/* Top border line with horizontal padding */}
      <div className="w-full pt-16 mt-20 mb-10 px-4 sm:px-10 md:px-20 lg:px-32">
        <div className="border-t border-[#ddcb7f] w-full"></div>
      </div>

      <div className="bg-[#221f2e] text-white min-h-screen pb-5 px-4 sm:px-10 md:px-20 lg:px-32">
        <div className="grid md:grid-cols-2 gap-10 items-start mt-10">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl sm:text-6xl font-serif font-semibold text-[#ddcb7f] leading-tight mb-6">
              LET’S<br />GET IN<br />TOUCH
            </h1>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <form className="space-y-8 text-base sm:text-lg w-full">
              <div>
                <label className="block text-sm tracking-widest uppercase mb-2 text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-4 px-2 focus:outline-none focus:border-[#ddcb7f] transition-all duration-300"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm tracking-widest uppercase mb-2 text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-4 px-2 focus:outline-none focus:border-[#ddcb7f] transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-widest uppercase mb-2 text-gray-300">
                    Phone *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-4 px-2 focus:outline-none focus:border-[#ddcb7f] transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm tracking-widest uppercase mb-2 text-gray-300">
                  Message *
                </label>
                <textarea
                  rows="5"
                  className="w-full bg-transparent border-b border-gray-600 text-white text-lg py-4 px-2 focus:outline-none focus:border-[#ddcb7f] transition-all duration-300 resize-none"
                  required
                ></textarea>
              </div>
              <div className="text-right mt-4">
                <button
                  type="submit"
                  className="text-[#ddcb7f] text-4xl hover:scale-125 transform transition duration-300"
                >
                  ➝
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default InTouch
