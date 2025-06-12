import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from "framer-motion"

const Contact = () => {
  return (
    <>
      <div className="bg-[#221f2e] text-white min-h-screen pt-28 pb-10 px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl text-[#ddcb7f] font-bold mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-md text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, type: "spring" }}
          >
            We'd love to hear from you!
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto bg-[#2e2b3c] p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
        >
          <motion.form
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
              }}
            >
              <label className="block text-[#ddcb7f] mb-1">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-[#ddcb7f]"
                placeholder="Your Name"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
              }}
            >
              <label className="block text-[#ddcb7f] mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-[#ddcb7f]"
                placeholder="Your Email"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
              }}
            >
              <label className="block text-[#ddcb7f] mb-1">Message</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-[#ddcb7f]"
                placeholder="Your Message"
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              className="bg-transparent border border-[#ddcb7f] text-[#ddcb7f] px-6 py-2 rounded hover:bg-[#ddcb7f] hover:text-[#221f2e] transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } }
              }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </>
  )
}

export default Contact
