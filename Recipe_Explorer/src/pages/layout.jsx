import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
    // You can later hook this up to your search API or filter logic
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-10">
      {/* Left: Logo / Brand */}
      
      <Link to="/" className="text-2xl font-bold text-gray-800">
        Recipe<span className="text-yellow-500">Explorer</span>
      </Link>

      {/* Center: Search */}
      <form
        onSubmit={handleSearch}
        className="flex-1 max-w-md w-full flex items-center border border-gray-300 rounded-lg overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 transition"
        >
          Search
        </button>
      </form>

      {/* Right: Buttons */}
      <div className="flex gap-3">
        <Link to="/favorites">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
          Favorites
        </button>
        </Link>

        <Link to="/cart">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
          Cart
        </button>
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white text-center py-4 mt-10">
      <p className="text-sm">
        This project is made by <span className="font-semibold">Abhirup Singh</span>
      </p>
    </footer>
  );
}
const Layout = ({children})=>{
    return(
        <>
        <Header></Header>
        {children}
        <Footer></Footer>
        </>
    )
}
export default Layout