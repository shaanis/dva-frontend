import React, { useState,useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";



// FAQ Data
const faqData = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order on our website, simply browse our collection of products, select the items you'd like to purchase, and add them to your shopping cart. Once you've finished shopping, proceed to checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and online wallets.",
  },
  {
    question: "Can I modify or cancel my order after it's been placed?",
    answer:
      "Yes, you can modify or cancel your order within 1 hour of placing it by contacting our support team.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email or SMS.",
  },
  {
    question: "How can I contact your customer support team?",
    answer:
      "You can contact our support team through the Help section or by emailing us directly at support@example.com.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-7xl rounded-3xl s p-6">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center mb-8">
          Frequently Asked Questions <span className="text-[#c9b037]">(FAQs)</span>
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`w-full rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-gradient-to-r from-white to-[#c9b037] shadow-xl"
                    : "bg-gray-100/20"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className={`w-full flex justify-between items-center p-5 text-left ${
                    isOpen ? "text-[#1e1e1e]" : "text-white"
                  }`}
                  style={{ width: "100%" }}
                >
                  <span className="font-semibold text-base md:text-lg w-full">
                    {faq.question}
                  </span>
                  <span
                    className={`text-2xl transition-transform ${
                      isOpen ? "rotate-180 text-[#1e1e1e]" : "text-white"
                    }`}
                  >
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                <div
                  className={`px-5 pb-5 text-[#1e1e1e] text-sm md:text-base transition-all duration-300 ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                  style={{ width: "100%" }}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
