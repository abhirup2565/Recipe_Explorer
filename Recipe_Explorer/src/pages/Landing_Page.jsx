import { useState } from "react";
import Button from "../components/Button";
import CuisineDropdown from "../components/Cusine_Dropdown";
import DisplayGrid from "../components/Display_Grid";

const Landing_Page = ()=>{
    const [selectedCuisine, setSelectedCuisine] = useState({
        type: "allCategory",
        value: "allCategory"
    });
    return (<>
        <div className="flex justify-center gap-6 my-6">
            <CuisineDropdown 
                selectedCuisine={selectedCuisine}
                onSelectCuisine={setSelectedCuisine}
            />
            <Button text = "Surprise Me"/>
            <Button text = "Ingredients"/>
        </div>
        <DisplayGrid displayItem={selectedCuisine} setDisplayItem={setSelectedCuisine}/>
    </>
  );
}

export default Landing_Page