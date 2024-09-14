import axios from 'axios';

// Function to fetch a random meal
async function fetchRandomMeal() {
  try {
    // Base URL for the random endpoint
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

    // Make the API call
    const response = await axios.get(url);

    // Log and return the data
    console.log('Random Meal:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching random meal:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}
export default fetchRandomMeal;