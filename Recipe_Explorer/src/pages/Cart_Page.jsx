import { useEffect, useState } from "react";
import createStorageManager from "../utils/storageFactory";
import { Trash2 } from "lucide-react";
import Button from "../components/Button";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Initialize localStorage manager
  const cartManager = createStorageManager("cart");

  // Fetch cart items on mount
  useEffect(() => {
    setCart(cartManager.get());
  }, []);

  // Delete item from cart
  const handleDelete = (id) => {
    const updated = cartManager.remove(id);
    setCart(updated);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 min-h-[100vh]">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">No items available</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition"
            >
              <p className="text-gray-800 font-medium">{item.name}</p>

              <Trash2
                className="text-red-500 hover:text-red-700 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDelete(item.id);
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-6">
          <Button text="Clear All" color="red" variant="filled" onClick={()=> {cartManager.clear()
            setCart([])
          }}/>
      </div>
    </div>
  );
}
