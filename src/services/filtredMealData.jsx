import axios from "axios";

// Function to make sequential API calls and return meals that match all parameters (category, area, ingredient)
async function filtredMealData(category = null, area = null, ingredient = null) {
  try {
    // Base URL
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php';

    let meals = [];

    // Step 1: Search by category if provided
    if (category) {
      const categoryResponse = await axios.get(`${baseUrl}?c=${category}`);
      meals = categoryResponse.data.meals || [];
    }

    // Step 2: If area is provided and meals are already fetched (or not), fetch area meals
    if (area) {
      const areaResponse = await axios.get(`${baseUrl}?a=${area}`);
      const areaMeals = areaResponse.data.meals || [];
      if (meals.length > 0) {
        // Intersect with already fetched meals
        meals = meals.filter(meal => areaMeals.some(areaMeal => areaMeal.idMeal === meal.idMeal));
      } else {
        // If no meals yet, set meals to areaMeals
        meals = areaMeals;
      }
    }

    // Step 3: If ingredient is provided and meals are already fetched (or not), fetch ingredient meals
    if (ingredient) {
      const ingredientResponse = await axios.get(`${baseUrl}?i=${ingredient}`);
      const ingredientMeals = ingredientResponse.data.meals || [];
      if (meals.length > 0) {
        // Intersect with already fetched meals
        meals = meals.filter(meal => ingredientMeals.some(ingMeal => ingMeal.idMeal === meal.idMeal));
      } else {
        // If no meals yet, set meals to ingredientMeals
        meals = ingredientMeals;
      }
    }

    // If no meals are found, return an empty object instead of an empty array
    const mealData = meals.length > 0 ? { meals } : { meals: null };

    // Log and return the final mealData object
    console.log('Filtered Meal Data:', mealData);
    return mealData;

  } catch (error) {
    console.error('Error fetching meal data:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export default filtredMealData;
