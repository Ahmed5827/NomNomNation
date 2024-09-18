import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollableDropdown from "../ScrollableDropdown/ScrollableDropdown";
import Region from "../../Data/DropDown/Region";
import Category from "../../Data/DropDown/Category";
import "./SearchByIngredient.css";
import Ingredients from "../../Data/SearchRecomondation/Ingredients";
import filtredMealData from './../../services/filtredMealData';
import MealCard from "../Card/Card";


function SearchByIngredient() {
  const [Regionselected, setRegion] = useState("");
  const [Categoryselected, setCategory] = useState("");
  const [Ingredientselected, setIngredient] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Meals, setMeals] = useState([]);

  const handleSelectRegion = (item) => {
    if (item.label === "Region") {
      setRegion("");
    } else {
      setRegion(item.label);
    }
  };

  const handleSelectCategory = (item) => {
    if (item.label === "Category") {
      setCategory("");
    } else {
      setCategory(item.label);
    }
  };

  const handleChange = (event) => {
    setIngredient(event.target.value);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (Ingredientselected.trim()) {
        const allSuggestions = Ingredients;
        const results = allSuggestions
          .filter((item) =>
            item.toLowerCase().startsWith(Ingredientselected.toLowerCase())
          )
          .slice(0, 6);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [Ingredientselected]);

  const handleSearch = async () => {
    try {
        const mealData = await filtredMealData(Categoryselected,Regionselected,Ingredientselected); // API call to get random recipe (you will implement fetchRandomMeal)
        setMeals((mealData.meals)?mealData.meals:[]);
        console.log(Meals)
    } catch (error) {
        console.error("Error fetching meals:", error);
    }
};



  const handleSuggestionClick = (suggestion) => {
    setIngredient(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="container top">
        <h1>Find Meals For Your Ingredient</h1>
        <small>
          {" "}
          <b>
            {" "}
            <i>{"What's cooking good looking"}</i>😉
          </b>
        </small>
        <div className="searchbar">
          <div className="input-container" style={{ position: "relative" }}>
            <input
              type="text"
              name="name-search"
              id="name-search-input"
              onChange={handleChange}
              value={Ingredientselected}
              placeholder="Type to search..."
              autoComplete="off"
            />
            <div className="search-icon">
              <img src="search-icon.svg" alt="search" onClick={handleSearch}/>
            </div>
          </div>
          {suggestions.length > 0 && (<div><small>did you mean ? </small>
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
            </div>)}
          <Link to={"/SearchByName"}>Search by meal</Link>
        </div>
        <div className="filters">
          <ScrollableDropdown
            items={Category}
            defaultText="Category"
            onSelect={handleSelectCategory}
          />

          <ScrollableDropdown
            items={Region}
            defaultText="Region"
            onSelect={handleSelectRegion}
          />
        </div>
      </div>
      <div>
        <div className="search" ><h3 >{Meals.length !==0 && Meals.length + " Search Results :"}</h3></div>
        <div className="cards">
  {Meals.map(M => (
    <MealCard 
      key={M.idMeal} 
      title={M.strMeal} 
      text="View Recepie" 
      imageUrl={M.strMealThumb}
      mealid={M.idMeal}
     
    />
  ))}
</div>

      </div>
    </div>
  );
}

export default SearchByIngredient;
