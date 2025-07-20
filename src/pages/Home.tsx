import type { JSX } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../interfaces/Product";
import { useCart } from "../hooks/useCart";
import { notifySuccess } from "../utils/toats";
import { SkeletonCard } from "../components/SkeletonCard";

export default function Home(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
        const cats = Array.from(new Set(data.map((p) => p.category)));
        setCategories(cats);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm, products]);

  if (loading) return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <h1 className="mb-4 text-2xl font-semibold">Productos</h1>

      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <label className="mr-2 font-medium">Categoría:</label>
          <select
            className="px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 md:ml-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between p-4 transition bg-white rounded shadow hover:shadow-lg dark:bg-gray-800"
          >
            <div>
              <img
                src={product.image}
                alt={product.title}
                className="object-contain h-40 mx-auto mb-2"
              />
              <h2 className="text-lg font-medium line-clamp-2 mb-1 min-h-[3rem] dark:text-gray-200">
                {product.title}
              </h2>
              <p className="mb-2 font-semibold text-blue-600 dark:text-blue-400">
                ${product.price}
              </p>
            </div>
            <div className="mt-auto space-y-2">
              <Link
                to={`/product/${product.id}`}
                className="block py-2 text-center text-gray-800 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Ver detalle
              </Link>
              <button
                className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => {
                  addToCart({ ...product, quantity: 1 });
                  notifySuccess("Producto agregado al carrito");
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
