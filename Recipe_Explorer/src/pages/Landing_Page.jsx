import { useDisplay } from "../context/DisplayContext";
import Button from "../components/Button";
import CuisineDropdown from "../components/Cusine_Dropdown";
import DisplayGrid from "../components/Display_Grid";
import { useNavigate } from "react-router-dom";
import fetchSafe from "../networks/fetchSafe";
import { API } from "../networks/api";

const Landing_Page = ()=>{
    const { currentState, goForward, goBack } = useDisplay();
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
                selectedCuisine={currentState}
                onSelectCuisine={goForward}
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
                    onClick={()=>goForward({ type: "Ingredients", value: "Ingredients" })}
                />
            </div>
        </div>
        <div className="flex justify-between items-center mb-6">
            {currentState.type !== "allCategory" && (
            <Button text="Back" onClick={goBack} color="gray" />
            )}
        </div>
        <DisplayGrid displayItem={currentState} setDisplayItem={goForward}/>
    </>
  );
}

export default Landing_Page