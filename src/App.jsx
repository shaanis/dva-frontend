import React from 'react'
import './App.css'
import Header from './components/Header'
import Contact from './pages/Contact'
import About from './pages/About'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Footer from './components/Footer'
import Login from './Login'
import Dashboard from './admin/pages/Dashboard'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Sample from './pages/Sample'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/sample" element={<Sample />} />
        {/* <Route path="/about" element={<About/>} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
