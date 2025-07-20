import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { notifyError, notifySuccess } from "../utils/toats";

export default function Checkout(): JSX.Element {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirm = () => {
    if (cart.length === 0) {
      notifyError("El carrito está vacío.");
      return;
    }

    clearCart();
    notifySuccess("¡Compra realizada con éxito!");
    navigate("/");
  };

  return (
    <div className="dark:text-gray-200">
      <h1 className="mb-6 text-2xl font-semibold">Confirmación de compra</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No hay productos en el carrito.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded shadow dark:bg-gray-800"
            >
              <div>
                <h2 className="font-medium dark:text-white">{item.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="text-lg font-bold text-right dark:text-white">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  );
}
