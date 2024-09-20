import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Meal.css";
import React from "react";
import YouTube from "react-youtube";

function Meal() {
    const location = useLocation();
    const Meal = location.state?.Meal; // Get the meal data from the location state

    const [meal, setMeal] = useState(Meal);
    const ingredientNames = Object.keys(Meal.meals[0]).filter(
        (key) => key.includes("strIngredient") && Meal.meals[0][key] !== ""
    );
    const ingredientMeasure = Object.keys(Meal.meals[0]).filter(
        (key) => key.includes("strMeasure") && Meal.meals[0][key] !== ""
    );
    const ingredients = Object.fromEntries(
        ingredientNames.map((key, index) => [key, ingredientMeasure[index]])
    );

    // Used later to construct a link to a youtube video with a thumbnail image
    const videoUrl = Meal.meals[0]?.strYoutube;
    const videoId = videoUrl?.split("?v=")[1];
    const thumbnailUrl = videoId
        ? `https://img.youtube.com/vi/${videoId}/0.jpg`
        : "";

    if (!Meal) {
        return <p>No Meal data available.</p>;
    }

    // Process instructions
    const processInstructions = (instructions) => {
        try {
            // Normalize line breaks and remove excess spaces
            let normalizedInstructions = instructions
                .replace(/\r\n/g, "\n")
                .replace(/\r/g, "\n")
                .trim();

            // Split by steps using common step patterns
            const stepPatterns = /(?:STEP \d+|Step \d+|\d+\.\s*)+/g;
            let rawSteps = normalizedInstructions
                .split(stepPatterns)
                .filter((step) => step.trim());
            let cleanedSteps = rawSteps
                .map((step) => step.trim())
                .filter((step) => step);

            return cleanedSteps;
        } catch (err) {
            console.error("Error processing instructions:", err);
            return [];
        }
    };

    const instructions = processInstructions(Meal.meals[0].strInstructions);
    const opts = {
        height: '180',
        width: '320',

    };
    return (
        <>
            <div className="container_meal">
                <div className="general_info">
                    <div className="container_image">
                        <img
                            src={Meal.meals[0]?.strMealThumb}
                            alt="Meal Thumbnail"
                            srcSet=""
                        />
                    </div>
                    <div className="meal_general_info">
                        <div className="title">{Meal.meals[0].strMeal}</div>
                        <div className="tags">
                            <b>Tags : </b>
                            <small>
                                {Meal.meals[0].strArea}
                            </small>
                            <small>
                                {Meal.meals[0].strCategory}
                            </small></div>
                        <div></div>
                    </div>
                </div>
                <div className="actual_cooking">

                    <div className="product">
                        <h1 className="title">{Meal.meals[0].strMeal}</h1>

                        <div>
                            <h2>Ingredients</h2>
                            <ul className="ingredients list-group">
                                {Object.keys(ingredients).map((key) => (
                                    <li className="ingredient list-group-item" key={key}>
                                        <div>{Meal.meals[0][key]} :</div>
                                        <div>{Meal.meals[0][ingredients[key]].trim().split(" ").length > 2 ? Meal.meals[0][ingredients[key]].split(" ").slice(1).join(" ") : Meal.meals[0][ingredients[key]]}</div>
                                    </li>
                                ))}
                            </ul>
                            <h2>Recipe Instructions</h2>
                            <ol>
                                {instructions.map(
                                    (step, index) =>
                                        step && ( // Ensure there's no empty step
                                            <li key={index}>{step}</li> // Trim to clean up spaces
                                        )
                                )}
                            </ol>
                        </div>
                    </div>




                    <div className="directions">


                        <p>Cooking made easier</p>
                        <div className="container_youtube">
                            <YouTube videoId={videoId} onReady={"onReady"} opts={opts} />
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/SearchByName">Back to Search</Link>
        </>
    );
}

export default Meal;
