import './CookingLoader.css'; // Assuming you keep the CSS in a separate file

const CookingLoader = () => {
  return (
    <div className="cooking-loader">
    <h1>Searching For Meals </h1>
      <div id="cooking">
      
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div id="area">
          <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
          </div>
          <div id="pancake">
            <div id="pastry"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingLoader;
