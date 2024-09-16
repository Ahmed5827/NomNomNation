import {  useState } from "react";

import ScrollableDropdown from "../ScrollableDropdown/ScrollableDropdown";
import Region from "../../Data/DropDown/Region";
import Category from "../../Data/DropDown/Category";
import "./SearchByIngredient.css"

function SearchByIngredient() {

  const [Regionselected, setRegion] = useState("");
  const [Categoryselected, setCategory] = useState("");

  const handleSelectRegion = (item) => {
    setRegion(item.label);
  };
  const handleSelectCategory = (item) => {
    setCategory(item.label);
  };

  return (
    <div>
      <div className="container top">
        <h1>Find Meals For Your ingredient</h1>
        <small>
          {" "}
          <b>
            {" "}
            <i>{"What's cooking good looking"}</i>😉
          </b>
        </small>
        <div className="searchbar">
          <input placeholder="search bar instead of me"></input>
          <a href="" >Search by meal</a>
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
      <div></div>
    </div>
  );
}

//search bar needs to be done 
//api call + display the data

export default SearchByIngredient;
