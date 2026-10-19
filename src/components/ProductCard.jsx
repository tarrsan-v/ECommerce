import { ShoppingCart } from "lucide-react";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />

      <h3 className="font-semibold text-lg">{product.name}</h3>

      <p className="text-gray-500 text-sm">{product.category}</p>

      <p className="text-xl font-bold mt-2">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 cursor-pointer"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;