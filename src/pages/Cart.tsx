import type { JSX } from "react";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";

export default function Cart(): JSX.Element {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p className="mt-10 text-xl text-center dark:text-white">El carrito está vacío.</p>;
  }

  return (
    <div className="dark:text-gray-200">
      <h1 className="mb-6 text-2xl font-semibold">Carrito de compras</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white rounded shadow dark:bg-gray-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="object-contain w-16 h-16"
            />
            <div className="flex-1">
              <h2 className="font-medium line-clamp-1 dark:text-white">{item.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <label
                  htmlFor={`qty-${item.id}`}
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Cantidad:
                </label>
                <input
                  id={`qty-${item.id}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Math.max(1, parseInt(e.target.value) || 1);
                    updateQuantity(item.id, value);
                  }}
                  className="w-16 px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-end gap-4 mt-6">
        <p className="text-xl font-bold dark:text-white">Total: ${total.toFixed(2)}</p>
        <Link
          to="/checkout"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Finalizar compra
        </Link>
      </div>
    </div>
  );
}
