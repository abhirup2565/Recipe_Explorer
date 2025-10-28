import Button from "../components/Button";
import CuisineBadge from "../components/Cusine_Badge";


function ActionButtons() {
  return (
    <div className="flex justify-center gap-6 my-6">
      <Button text = "Surprise Me"/>
      <Button text = "Ingredients"/>
    </div>
  );
}

const Landing_Page = ()=>{
    const recipes = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      desc: "A creamy pasta dish from Rome with eggs, cheese, and pancetta.",
      img: "https://source.unsplash.com/400x300/?pasta",
    },
    {
      id: 2,
      title: "Chicken Tikka Masala",
      desc: "Tender chicken chunks in a spiced tomato cream sauce.",
      img: "https://source.unsplash.com/400x300/?curry",
    },
    {
      id: 3,
      title: "Sushi Platter",
      desc: "Fresh and flavorful Japanese sushi rolls with wasabi and soy sauce.",
      img: "https://source.unsplash.com/400x300/?sushi",
    },
  ];
    return (<>
        <CuisineBadge/>
        <ActionButtons/>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
      {recipes.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
        >
          <img src={item.img} alt={item.title} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Landing_Page