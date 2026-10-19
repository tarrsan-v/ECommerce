import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 1999,
    image: "https://placehold.co/400x300?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 2499,
    image: "https://placehold.co/400x300?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    price: 1499,
    image: "https://placehold.co/400x300?text=Shoes"
  },
  {
    id: 4,
    name: "Laptop Backpack",
    category: "Accessories",
    price: 899,
    image: "https://placehold.co/400x300?text=Backpack"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1299,
    image: "https://placehold.co/400x300?text=Speaker"
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    category: "Fashion",
    price: 599,
    image: "https://placehold.co/400x300?text=T-Shirt"
  }
];

function Home() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");

  const [limit, setLimit] = useState(0);
  const [spent, setSpent] = useState(0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price,
    0
  );

  const remaining = limit - spent;

  function addToCart(product) {
    if (limit > 0 && cartTotal + product.price > remaining) {
      alert("Spending limit exceeded! Cannot add this product.");
      return;
    }

    setCart([...cart, product]);
    alert("Product added to cart!");
  }

  function checkout() {
    if (cart.length === 0) return;

    if (limit > 0 && cartTotal > remaining) {
      alert("Spending limit exceeded!");
      return;
    }

    setSpent(spent + cartTotal);
    setCart([]);
    alert("Order placed successfully!");
    setPage("home");
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar
        cartCount={cart.length}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
      />

      {page === "home" && (
        <main className="max-w-7xl mx-auto p-6">

          <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-10 rounded-2xl mb-8">
            <h2 className="text-4xl font-bold mb-3">
              Welcome to E-Commerce
            </h2>
            <p className="text-lg">
              Shop smarter. Spend better.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

        </main>
      )}

      {page === "cart" && (
        <main className="max-w-4xl mx-auto p-6">

          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 mb-3 rounded-lg flex justify-between items-center"
            >
              <span>{item.name}</span>

              <span>₹{item.price}</span>

              <button
                onClick={() => setCart(cart.filter((_, i) => i !== index))}
                className="text-red-600 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}

          <h3 className="text-2xl font-bold mt-6">
            Total: ₹{cartTotal}
          </h3>

          <button
            onClick={checkout}
            disabled={cart.length === 0}
            className="bg-green-600 text-white px-8 py-3 rounded-lg mt-5 disabled:opacity-50 cursor-pointer"
          >
            Place Order
          </button>

        </main>
      )}

      {page === "limit" && (
        <main className="max-w-xl mx-auto p-6">

          <div className="bg-white p-8 rounded-xl shadow">

            <h2 className="text-3xl font-bold mb-6">
              Spending Limit
            </h2>

            <label className="block mb-2">
              Set your spending limit (₹)
            </label>

            <input
              type="number"
              min="1"
              placeholder="Example: 5000"
              className="w-full border rounded-lg p-3 mb-4"
              id="limitInput"
            />

            <button
              onClick={() => {
                const value = Number(
                  document.getElementById("limitInput").value
                );

                if (!Number.isSafeInteger(value) || value <= 0) {
                  alert("Enter a valid positive amount");
                  return;
                }

                if (limit > 0) {
                  alert("A spending limit is already active");
                  return;
                }

                if (value < cartTotal) {
                  alert("Limit cannot be less than your cart total");
                  return;
                }

                setLimit(value);
                alert("Spending limit activated!");
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer"
            >
              Set Limit
            </button>

            <div className="mt-8 space-y-3">
              <p>Limit: ₹{limit}</p>
              <p>Spent: ₹{spent}</p>
              <p className="text-green-600 font-bold">
                Remaining: ₹{limit > 0 ? remaining : "No limit set"}
              </p>
            </div>

          </div>

        </main>
      )}

    </div>
  );
}

export default Home;