import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from "framer-motion"

const About = () => {
  return (
    <>
      <div className="bg-[#221f2e] text-white min-h-auto pt-16 pb-10 px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          {/* <motion.h1
            className="text-4xl md:text-5xl text-[#ddcb7f] font-bold mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          >
            About DVA
          </motion.h1> */}
          {/* <motion.p
            className="text-md text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
          >
            Where Comfort Meets Confidence
          </motion.p> */}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
          >
            <img
              src="https://images.pexels.com/photos/5490974/pexels-photo-5490974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="About DVA"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7, type: "spring" }}
          >
            <h2 className="text-2xl text-[#ddcb7f] mb-4 font-semibold">
              Our Story
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              DVA was born from a vision to blend comfort and confidence in everyday wear. Our collection is crafted with care, combining elegant designs with high-quality fabrics that feel great and look stunning.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you’re relaxing at home or stepping out, DVA brings you stylish choices that make you feel empowered and beautiful every day.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default About
