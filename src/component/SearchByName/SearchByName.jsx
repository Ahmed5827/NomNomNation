import { Link } from "react-router-dom";
import "./SearchByName.css"

function SearchByName() {


  return (
    <div>
      <div className="container top">
        <h1>Find ingredients For Your Meal</h1>
        <small>
          {" "}
          <b>
            {" "}
            <i>{"What's cooking good looking"}</i>😉
          </b>
        </small>
        <div className="searchbar">
          <div className="input-container">
            <input type="text" name="name-search" id="name-search-input" />
            <div className="search-icon">
              <img src="search-icon.svg" alt="search" />
            </div>
          </div>
          <Link to={"/SearchByIngredient"}>Search by ingredient</Link>
        </div>

      </div>
      <div></div>
    </div>
  );
}
export default SearchByName