import { Routes, Route } from "react-router-dom";

import SearchByIngredient from "./../SearchByIngredient/SearchByIngredient";
import SearchByName from "../SearchByName/SearchByName";
import Meal from "../Meal/Meal";
import NotFound from "../NotFound/NotFound";
function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchByIngredient></SearchByIngredient>} />
        <Route
          path="/SearchByIngredient"
          element={<SearchByIngredient></SearchByIngredient>}
        />
        <Route path="/SearchByName" element={<SearchByName></SearchByName>} />
        <Route path="/Meal" element={<Meal></Meal>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>
      
    </>
  );
}

export default Home;
