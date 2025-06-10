import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../../src/index.css';
import dvalogo from'../assets/dvalogo.png'
import dvalogo1 from'../assets/dvalogo1.png'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Hide navbar on dashboard route
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='bg-gray-800 text-white p-4' ref={menuRef}>
      <div className='flex justify-between items-center'>
        {/* <h2 style={{ color: '#ddcb7f' }} className='text-2xl sm:ps-10'>DVA</h2> */}
        <img width={'50px'} src={dvalogo} alt="" />

        {/* Menu icon for small screens */}
        <button className='md:hidden text-2xl' onClick={toggleMenu}>
          <FaBars />
        </button>

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-14 nav-list pe-16 ' style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li className='text-[#ddcb7f]'><Link to="/">Home</Link></li>
          <li className='text-[#ddcb7f]'><Link to="/shop">Shop</Link></li>
          <li className='text-[#ddcb7f]'><Link to="/about">About</Link></li>
          <li className='text-[#ddcb7f]'><Link to="/contact">Contact</Link></li>
          <li><Link to="/login"><i className="fa-solid fa-user text-[#ddcb7f]"></i></Link></li>

        </ul>

        {/* <ul className='hidden md:flex space-x-8 pe-14' style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/cart"><i className="fa-solid fa-bag-shopping"></i></Link></li>
        </ul> */}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden mt-4 space-y-4 text-center'>
          <ul className='flex flex-col space-y-2' style={{ fontFamily: 'Poppins, sans-serif' }}>
            <li className='text-[#ddcb7f]'><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li className='text-[#ddcb7f]'><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
            <li className='text-[#ddcb7f]'><Link to="/" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li className='text-[#ddcb7f]'><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li ><Link to="/login" onClick={() => setMenuOpen(false)}><i class="fa-solid fa-user text-[#ddcb7f]"></i></Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
