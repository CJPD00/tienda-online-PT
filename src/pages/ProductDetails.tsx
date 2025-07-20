import { useEffect, useState, type JSX } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { notifySuccess } from "../utils/toats";
import type { Product } from "../interfaces/Product";
import { SkeletonDetail } from "../components/SkeletonDetails";
export default function ProductDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data: Product) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <SkeletonDetail />;
  if (!product) return <p className="dark:text-white">No se encontró el producto.</p>;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow dark:bg-gray-800">
      <div className="flex flex-col gap-6 md:flex-row">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain w-full h-64 md:w-1/3"
        />
        <div className="flex-1">
          <h1 className="mb-2 text-2xl font-bold dark:text-white">{product.title}</h1>
          <p className="mb-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
            ${product.price}
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{product.description}</p>
          <button
            onClick={() => {
              addToCart({ ...product, quantity: 1 });
              notifySuccess("Producto agregado al carrito");
            }}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
