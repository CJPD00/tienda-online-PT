import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import type { JSX } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(): JSX.Element {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="p-4 mx-auto max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
