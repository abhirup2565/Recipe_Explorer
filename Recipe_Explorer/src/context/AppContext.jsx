import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading,setLoading] = useState(false);

  

  return (
    <AppContext.Provider value={{
      favorites,setFavorites,
      cart,setCart,
      loading,setLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
