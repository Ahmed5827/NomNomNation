import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Meal.css";
import React from "react";
import YouTube from "react-youtube";

function Meal() {
  const navigate = useNavigate();
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
  console.log(Meal.meals);
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
    height: "180",
    width: "320",
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
              <small>{Meal.meals[0].strArea}</small>
              <small>{Meal.meals[0].strCategory}</small>
            </div>
            <div></div>
          </div>
        </div>
        <div className="actual_cooking">
          <div className="product">
            <div>
              <h2>Ingredients</h2>
              <ul className="ingredients list-group">
                {Object.keys(ingredients).map(
                  (key) =>
                    // Only render the list item if both the key and its associated value are not null/empty
                    Meal?.meals[0]?.[key]?.trim() &&
                    Meal?.meals[0]?.[ingredients[key]]?.trim() ? (
                      <li className="ingredient list-group-item" key={key}>
                        <div>
                          {/* Display the key with a colon if it exists and is not empty */}
                          {Meal?.meals[0]?.[key] &&
                          Meal.meals[0][key].trim() !== ""
                            ? `${Meal.meals[0][key]} :`
                            : null}
                        </div>

                        <div>
                          {/* Display the ingredient or "As needed" if null/empty */}
                          {Meal?.meals[0]?.[ingredients[key]] &&
                          Meal.meals[0][ingredients[key]].trim()
                            ? Meal.meals[0][ingredients[key]].trim().split(" ")
                                .length > 2
                              ? Meal.meals[0][ingredients[key]]
                                  .split(" ")
                                  .slice(1)
                                  .join(" ")
                              : Meal.meals[0][ingredients[key]]
                            : "As needed"}
                        </div>
                      </li>
                    ) : null // Skip rendering if key or value is null/empty
                )}
              </ul>
            </div>
          </div>

          <div className="directions">
            <h2>Recipe Instructions</h2>
            <ol>
              {/*list_instructions.map(
                                (step, index) =>
                                    step && ( // Ensure there's no empty step
                                        <li key={index}>{step}</li> // Trim to clean up spaces
                                    )
                            )*/}
              {instructions}
            </ol>

            <p>Cooking made easier</p>
            <div className="container_youtube">
              <YouTube videoId={videoId} onReady={"onReady"} />
            </div>
          </div>
        </div>
      </div>
      <div className="return-button" onClick={() => navigate("/SearchByName")}>
        <img src="return.svg" />
      </div>
    </>
  );
}

export default Meal;
