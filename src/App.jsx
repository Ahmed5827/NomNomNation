import { BrowserRouter } from "react-router-dom";
import Home from "./component/Home/Home";
import LuckyButton from "./component/LuckyButton/LuckyButton";

function App() {
  return (
    <>
      <BrowserRouter>
        <Home />
      </BrowserRouter>

      <LuckyButton />
    </>
  );
}

export default App;
