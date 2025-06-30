import React from 'react'
import './App.css'
import Products from './components/products/Products'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/shared/Navbar'
import About from './components/About'
import Contact from './components/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './components/cart/Cart'
import LogIn from './components/auth/LogIn'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/auth/Register'
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/PaymentConfirmation'
import Footer from './components/shared/Footer'
import ProductDetail from './components/products/ProductDetail'

// Admin Components
import AdminRoute from './components/admin/AdminRoute'
import AdminLoginRoute from './components/admin/AdminLoginRoute'
import AdminDashboard from './components/admin/dashboard/AdminDashboard'
import CategoryList from './components/admin/categories/CategoryList'
import ProductList from './components/admin/products/ProductList'
import BrandList from './components/admin/brands/BrandList'

// Component to conditionally render Navbar and Footer
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
      
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirm" element={<PaymentConfirmation />} />
        </Route>

        <Route path="/" element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginRoute />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="brands" element={<BrandList />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <React.Fragment>
      <Router>
        <AppContent />
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  )
}

export default App
