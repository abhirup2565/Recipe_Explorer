import { useState } from "react";
import Button from "../components/Button";
import CuisineDropdown from "../components/Cusine_Dropdown";
import DisplayGrid from "../components/Display_Grid";
import { useNavigate } from "react-router-dom";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";

const Landing_Page = ()=>{
    const [selectedCuisine, setSelectedCuisine] = useState({
        type: "allCategory",
        value: "allCategory"
    });
    const navigate = useNavigate();

    const handleSurpriseMe = async () => {
    try {
        const res = await fetchSafe.get(API.RANDOM_MEAL);
        const data = res.data;

        if (data?.meals?.length) {
        const randomMeal = data.meals[0];
        navigate(`/dish/${randomMeal.idMeal}`);
        } else {
        console.error("No meal found in response");
        }
    } catch (error) {
        console.error("Error fetching random meal:", error.message);
    }
    };

    return (<>
        <div className="flex flex-wrap justify-center items-center gap-4 my-6">
            <CuisineDropdown
                selectedCuisine={selectedCuisine}
                onSelectCuisine={setSelectedCuisine}
            />
            <div className="flex gap-4">
                <Button
                    text="🎲 Surprise Me"
                    color="yellow"
                    variant="filled"
                    className="w-full sm:w-auto"
                    onClick={handleSurpriseMe}
                />
                <Button
                    text="🍳 Ingredients"
                    color="gray"
                    variant="outline"
                    className="w-full sm:w-auto"
                    //onClick={handleIngredients}
                />
            </div>
        </div>
        <DisplayGrid displayItem={selectedCuisine} setDisplayItem={setSelectedCuisine}/>
    </>
  );
}

export default Landing_Page