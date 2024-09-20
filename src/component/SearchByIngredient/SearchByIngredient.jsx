import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollableDropdown from "../ScrollableDropdown/ScrollableDropdown";
import Region from "../../Data/DropDown/Region";
import Category from "../../Data/DropDown/Category";
import "./SearchByIngredient.css";
import Ingredients from "../../Data/SearchRecomondation/Ingredients";
import filtredMealData from "./../../services/filtredMealData";
import MealCard from "../Card/Card";
import Pagination from "react-bootstrap/Pagination";

function SearchByIngredient() {
  const [Regionselected, setRegion] = useState("");
  const [Categoryselected, setCategory] = useState("");
  const [Ingredientselected, setIngredient] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [Meals, setMeals] = useState(null); // null to handle no results initially
  const [DisplayedMeals, setDisplayedMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuggestionClicked, setIsSuggestionClicked] = useState(false); // New state

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Update displayed meals based on current page and meals
  useEffect(() => {
    if (Meals && Meals.length > 0) {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setDisplayedMeals(Meals.slice(startIndex, endIndex));
    } else {
      setDisplayedMeals([]); // Reset if no meals
    }
  }, [Meals, currentPage]);

  // Pagination button click handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((Meals ? Meals.length : 0) / ITEMS_PER_PAGE);

  const handleSelectRegion = (item) => {
    if (item.label === "Region") {
      setRegion("");
    } else {
      setRegion(item.label);
    }
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleSelectCategory = (item) => {
    if (item.label === "Category") {
      setCategory("");
    } else {
      setCategory(item.label);
    }
  };

  const handleChange = (event) => {
    setIngredient(event.target.value);
    if (!isSuggestionClicked) {
      fetchSuggestions(event.target.value); // Fetch suggestions only when typing, not after selection
    }
    setIsSuggestionClicked(false); // Reset after typing
  };

  const fetchSuggestions = (inputValue) => {
    if (inputValue.trim()) {
      const results = Ingredients.filter((item) =>
        item.toLowerCase().startsWith(inputValue.toLowerCase())
      ).slice(0, 6);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    setLoading(true); // Start loading
    try {
      const mealData = await filtredMealData(
        Categoryselected,
        Regionselected,
        Ingredientselected
      );
      setMeals(mealData.meals ? mealData.meals : []); // handle the case when meals is null
      setCurrentPage(1); // Reset to the first page after search
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setIngredient(suggestion); // Set input field with the clicked suggestion
    setSuggestions([]); // Clear suggestions
    setIsSuggestionClicked(true); // Mark that a suggestion was clicked
  };

  return (
    <div>
      <div className="container top">
        <h1>Find Meals For Your Ingredient</h1>
        <small>
          <b>
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
              <img src="search-icon.svg" alt="search" onClick={handleSearch} />
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className="dropdown show">
              <ul className="dropdown-menu show" style={{ display: 'block', translate: '-60%' }}>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{ cursor: 'pointer' }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="search">
              <h3>
                {Meals === null
                  ? ""
                  : Meals.length !== 0
                  ? `${Meals.length} Search Results:`
                  : "No Meal Matches these criteria"}
              </h3>
            </div>
            <div className="cards">
              {DisplayedMeals.map((M) => (
                <MealCard
                  key={M.idMeal}
                  title={M.strMeal}
                  text="View Recipe"
                  imageUrl={M.strMealThumb}
                  mealid={M.idMeal}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="pagination">
        {totalPages > 1 && <Pagination>{paginationItems}</Pagination>}
      </div>
    </div>
  );
}

export default SearchByIngredient;
