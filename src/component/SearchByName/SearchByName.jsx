import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import searchMeals from "./../../services/searchMeals";
import MealCard from "../Card/Card"; // Assuming you have a MealCard component like in SearchByIngredient
import Pagination from "react-bootstrap/Pagination"; // To handle pagination
import "./SearchByName.css";
import CookingLoader from "../CookingLoader/CookingLoader";

function SearchByName() {
  const [searchedMeal, setSearchedMeal] = useState(""); // User's search input
  const [meals, setMeals] = useState(null); // Store fetched meals
  const [displayedMeals, setDisplayedMeals] = useState([]); // Meals displayed on the current page
  const [loading, setLoading] = useState(false); // Loading state for search
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const ITEMS_PER_PAGE = 8; // Items per page for pagination

  // Update displayed meals based on current page and meals
  useEffect(() => {
    if (meals && meals.length > 0) {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setDisplayedMeals(meals.slice(startIndex, endIndex));
    } else {
      setDisplayedMeals([]); // Reset if no meals
    }
  }, [meals, currentPage]);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearchedMeal(e.target.value);
  };

  // Handle search button click
  const handleSearch = async () => {
    setLoading(true); // Start loading
    try {
      if (searchedMeal !== "") {


        setMeals([]);
        const mealData = await searchMeals(searchedMeal);
        setMeals(mealData.meals ? mealData.meals : []);
      }
      // handle the case when meals is null
      setCurrentPage(1); // Reset to the first page after search
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Pagination button click handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((meals ? meals.length : 0) / ITEMS_PER_PAGE);

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

  return (
    <div>
      <nav
        className="navbar navbar-light"
        style={{ "background-color": "rgb(51,51,51)" }}
      >
        <Link to={"/SearchByIngredient"} className="toname">
          Search by Ingredient
        </Link>

        <div className="mx-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="searchbar">
                <div
                  className="input-container"
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    name="name-search"
                    id="name-search-input"
                    onChange={handleInputChange}
                    value={searchedMeal}
                    placeholder="Type to search..."
                    autoComplete="off"
                    style={{ width: "350px" }}
                  />
                  <div className="search-icon">
                    <img
                      src="search-icon.svg"
                      alt="search"
                      onClick={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container top">

        <div className="searchbar">
        </div>
      </div>

      <div>
        {loading ? (
          <div className="search"> <CookingLoader></CookingLoader></div>
        ) : (
          <>
            <div className="search">
              <h3>
                {meals === null
                  ? ""
                  : meals.length !== 0
                    ? `${meals.length} Search Results:`
                    : "No Meal Matches these criteria"}
              </h3>
            </div>
            <div className="pagination">
        {totalPages > 1 && <Pagination>{paginationItems}</Pagination>}
      </div>
            <div className="cards">
              {displayedMeals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  title={meal.strMeal}
                  text="View Recipe"
                  imageUrl={meal.strMealThumb}
                  mealid={meal.idMeal}
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

export default SearchByName;
