import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import '../../src/index.css';

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
        <h2 style={{ color: '#ddcb7f' }} className='text-2xl'>DVA</h2>

        {/* Menu icon for small screens */}
        <button className='md:hidden text-2xl' onClick={toggleMenu}>
          <FaBars />
        </button>

        {/* Desktop Menu */}
        <ul className='hidden md:flex space-x-4 nav-list' style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <ul className='hidden md:flex space-x-8 pe-14' style={{ fontFamily: 'Poppins, sans-serif' }}>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/cart"><i className="fa-solid fa-bag-shopping"></i></Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden mt-4 space-y-4 text-center'>
          <ul className='flex flex-col space-y-2' style={{ fontFamily: 'Poppins, sans-serif' }}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;
