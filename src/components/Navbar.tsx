import { Link } from "react-router-dom";
import type { JSX } from "react";
import { useCart } from "../hooks/useCart";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar(): JSX.Element {
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-800">
      <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Tienda
      </Link>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          {theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
        </button>
        <div className="relative">
          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ShoppingCart className="w-6 h-6" />
            <span>Carrito</span>
            {itemCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-3">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
