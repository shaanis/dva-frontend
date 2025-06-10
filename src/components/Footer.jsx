import React from 'react'
import { Link } from 'react-router-dom'
import dvalogo1 from'../assets/dvalogo1.png'


const Footer = () => {
  return (
    <footer className="bg-gray-800 py-10 pt-10 px-4">
       
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className='flex flex-col items-center sm:items-start'>
          {/* <h2 className="text-xl font-semibold mb-3 text-[#ddcb7f]">DVA</h2> */}
          <img width={'100'} src={dvalogo1} alt="" className='mb-5' />
          <p className="text-sm text-white">
            Where Comfort Meets Confidence. Premium innerwear designed for elegance and ease.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2 text-[#ddcb7f]">Quick Links</h3>
          <ul className="space-y-1 text-sm text-white">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2 text-[#ddcb7f]">Customer Care</h3>
          <ul className="space-y-1 text-sm text-white">
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/support" className="hover:underline">Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2 text-[#ddcb7f]">Get in Touch</h3>
          <p className="text-sm text-white">Email: support@dva.com</p>
          <p className="text-sm text-white">Phone: +91 98765 43210</p>
        </div>
      </div>

      <div className="border-t border-[#ddcb7f] mt-10 pt-4 text-center text-sm text-white">
        © {new Date().getFullYear()} DVA. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
