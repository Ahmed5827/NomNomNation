import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function Meal() {
    const location = useLocation();
    const Meal = location.state?.Meal; // Get the meal data from the location state

    if (!Meal) {
        return <p>No Meal data available.</p>;
    }
    console.log(Meal)
    return (
        <div>
            <h1>{Meal.meals[0].strMeal}</h1>
            <p>{Meal.meals[0].strInstructions}</p>
            <code><pre>{JSON.stringify(Meal.meals[0], null, 2)}</pre></code>
            {/* Render other meal details like image, ingredients, etc. */}
            <Link to="/SearchByName">Back to Search </Link>
        </div>
    );
}

export default Meal;
