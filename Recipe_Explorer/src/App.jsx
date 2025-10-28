import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Layout from "./pages/layout"
import Landing_Page from "./pages/Landing_Page";
import DishDetails from "./pages/Dish_Detail_Page"
import FavoritesPage from "./pages/Favorites_Page";
import CartPage from "./pages/Cart_Page";

function App() {

  return (
    <>
      <Layout>
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/dish/:id" element={<DishDetailsWrapper />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
      </Layout>
    </>
  )
}

// Small wrapper so we can use useParams inside DishDetails
import { useParams } from "react-router-dom";
function DishDetailsWrapper() {
  const { id } = useParams();
  return <DishDetails mealId={id} />;
}


export default App
