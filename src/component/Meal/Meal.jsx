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

  return (
    <>
      <div className="container_meal">
        <div className="product">
          <h1 className="title">{Meal.meals[0].strMeal}</h1>
          <small>
            <b>Tags :</b> {Meal.meals[0].strArea}
          </small>
          <small>{Meal.meals[0].strCategory}</small>
          <div>
          <h2>Ingredients</h2>
          <div>
            {Object.keys(ingredients).map((key) => (
              <div className="ingredient" key={key}>
                <div>{Meal.meals[0][key]} :</div>
                <div>{Meal.meals[0][ingredients[key]]}</div>
              </div>
            ))}
          </div>
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
        <div className="info_bubble">
        <img
            src={Meal.meals[0]?.strMealThumb}
            alt="Meal Thumbnail"
            srcSet=""
            style={{width:"40rem" , height:"30rem"}}
          />

          <p>Cooking made easier</p>
          <div>
            <YouTube videoId={videoId} onReady={"onReady"} />
          </div>
        </div>
      </div>
      <Link to="/SearchByName">Back to Search</Link>
    </>
  );
}

export default Meal;
