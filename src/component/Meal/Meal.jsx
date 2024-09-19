import { useState } from 'react'
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Meal.css"
function Meal() {
    const location = useLocation();
    const Meal = location.state?.Meal; // Get the meal data from the location state

    const [meal, setMeal] = useState(Meal);
    const ingredientNames = Object.keys(Meal.meals[0]).filter((key) => key.includes("strIngredient") && Meal.meals[0][key] != "");
    const ingredientMeasure = Object.keys(Meal.meals[0]).filter((key) => key.includes("strMeasure") && Meal.meals[0][key] != "");
    const ingredients = Object.fromEntries(ingredientNames.map((key, index) => [key, ingredientMeasure[index]]))
    console.log("ingredients: ", ingredients)
    console.log("Ingredient Names: ", ingredientNames)
    console.log("Ingredient Measure: ", ingredientMeasure)
    // Used later to construct a link to a youtube video with a thumnail image
    const videoUrl = Meal.meals[0]?.strYoutube;
    const videoId = videoUrl.split('?v=')[1];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    if (!Meal) {
        return <p>No Meal data available.</p>;
    }
    console.log(Meal)
    return (
        <>
            <div className="container_meal">
                <div className="product">
                    <h1 className='title'>{Meal.meals[0].strMeal}</h1>
                    <p className='description'>{Meal.meals[0].strInstructions}</p>
                    <img src={Meal.meals[0]?.strMealThumb} alt="" srcset="" />

                </div>
                <div className="info_bubble">
                    <h2>Ingredients</h2>
                    <div>
                        {Object.keys(ingredients).map(key => {
                            return <>
                                <div className="ingredient">
                                    <div>{Meal.meals[0][key]} :</div>
                                    <div>{Meal.meals[0][ingredients[key]]}</div>
                                </div>
                            </>
                        })}
                    </div>
                    <p>Cooking made easier</p>
                    <a href={videoUrl} target='_blank' className='container_image'>
                        <img src={thumbnailUrl} />
                        <img src="play.svg" className='play_button' />
                    </a>
                </div>
            </div>
            <Link to="/SearchByName">Back to Search </Link></>
    );
}

export default Meal;
