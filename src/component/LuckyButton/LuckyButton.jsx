import "./LuckyButton.css"
import { GiShamrock } from "react-icons/gi";
import fetchRandomMeal from "../../services/fetchRandomMeal";
import { useNavigate } from "react-router-dom";
function LuckyButton() {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const mealData = await fetchRandomMeal(); // API call to get random recipe (you will implement fetchRandomMeal)
            navigate("/Meal", { state: { Meal: mealData } }); // Navigate to the meals page with the data as state
        } catch (error) {
            console.error("Error fetching random meal:", error);
        }
    };


    return (<>
        <button id="LuckyButton" onClick={handleClick}> <GiShamrock /></button>

    </>)
}
//on click get a random recepie and display it
// the button should appear on evry page 
export default LuckyButton