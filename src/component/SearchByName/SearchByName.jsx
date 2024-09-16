import { Link } from "react-router-dom";


function SearchByName(){


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
              <input placeholder="search bar instead of me"></input>
              <Link to={"/SearchByIngredient"}>Search by ingredient</Link>
            </div>

          </div>
          <div></div>
        </div>
      );
}
export default SearchByName