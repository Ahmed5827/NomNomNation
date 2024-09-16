import { BrowserRouter } from "react-router-dom";
import Home from "./component/Home/Home";
import LuckyButton from "./component/LuckyButton/LuckyButton";

function App() {
  return (
    <>
    <div>
      <BrowserRouter>
        <Home />
        <LuckyButton />
      </BrowserRouter>

      
      </div>
    </>
  );
}

export default App;
