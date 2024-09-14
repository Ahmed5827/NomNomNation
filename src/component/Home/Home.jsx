import { useEffect, useState } from "react";
import filtredMealData from "../../services/filtredMealData"; // Adjust the path as needed
import ScrollableDropdown from "../ScrollableDropdown/ScrollableDropdown";
import Region from "../../Data/DropDown/Region";
import Category from "../../Data/DropDown/Category";
import "./Home.css"

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [Regionselected, setRegion] = useState("");
  const [Categoryselected, setCategory] = useState("");
  useEffect(() => {
    // Call the API function when the component mounts
    const loadData = async () => {
      try {
        const result = await filtredMealData([], "American", "");
        setData(result);
      } catch (err) {
        setError(err);
      }
    };

    loadData();
  }, []); // Empty dependency array means this effect runs once on mount

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
        <div>
          <input></input>
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
      <div>{error && <p>Error: {error.message}</p>}</div>
    </div>
  );
}

/*
{data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}

*/
export default Home;
