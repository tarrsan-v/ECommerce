import { ShoppingCart, User, Wallet } from "lucide-react";

function Navbar({ cartCount, search, setSearch, setPage }) {
  return (
    <header className="bg-blue-700 text-white sticky top-0 z-50 shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">

        <h1
          onClick={() => setPage("home")}
          className="text-2xl font-bold cursor-pointer"
        >
          E-Commerce
        </h1>

        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage("home");
          }}
          className="flex-1 bg-white text-black rounded-lg px-4 py-2 outline-none"
        />

        <button
          onClick={() => setPage("limit")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Wallet size={21} />
          Spending Limit
        </button>

        <button
          onClick={() => setPage("cart")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ShoppingCart size={22} />
          Cart ({cartCount})
        </button>

        <button className="cursor-pointer">
          <User size={22} />
        </button>

      </div>

    </header>
  );
}

export default Navbar;