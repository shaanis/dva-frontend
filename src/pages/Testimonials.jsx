import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aarav Mehta",
    title: "Verified Buyer",
    feedback:
      "DVA’s clothing is not only stylish but incredibly comfortable. The fabric quality is top-notch and the fit is perfect.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Ishita Kapoor",
    title: "Fashion Blogger",
    feedback:
      "Absolutely love how DVA blends elegance and comfort. Every piece feels like it’s made just for me.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Rohan Sharma",
    title: "Model & Influencer",
    feedback:
      "Wearing DVA makes me feel confident and stylish. The attention to detail in their designs is unmatched.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[#221f2e] text-white pt-20  px-4 min-h-auto pb-5">
      <motion.h2
        className="text-center text-3xl md:text-4xl font-bold text-[#ddcb7f] mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        What Our Customers Say
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            className="bg-[#2e2b3f] p-6 rounded-xl shadow-lg border border-[#3b3750] hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-14 h-14 rounded-full border-2 border-[#ddcb7f] object-cover"
              />
              <div>
                <h4 className="text-lg font-semibold text-[#ddcb7f]">
                  {t.name}
                </h4>
                <p className="text-sm text-gray-300">{t.title}</p>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed">{t.feedback}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
