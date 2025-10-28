import DishDetails from "./pages/Dish_Detail_Page"
import Landing_Page from "./pages/Landing_page"
import Layout from "./pages/layout"

function App() {

  return (
    <>
      <Layout>
        <DishDetails mealId={52771}/>
      </Layout>
    </>
  )
}

export default App
