import { Routes, Route, Navigate } from "react-router-dom";

import SearchByIngredient from "./../SearchByIngredient/SearchByIngredient";
import SearchByName from "../SearchByName/SearchByName";
import Meal from "../Meal/Meal";
import NotFound from "../NotFound/NotFound";
function Home() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/SearchByIngredient"} />} />
        <Route
          path="/SearchByIngredient"
          element={<SearchByIngredient></SearchByIngredient>}
        />
        <Route path="/SearchByName" element={<SearchByName></SearchByName>} />
        <Route path="/Meal" element={<Meal></Meal>} />
        <Route path="/not-found" element={<NotFound></NotFound>} />
        <Route path="/*" element={<Navigate to={"/not-found"} />} />
      </Routes>

    </>
  );
}

export default Home;
