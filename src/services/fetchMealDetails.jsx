import axios from 'axios';

// Function to fetch meal details by ID
async function fetchMealDetails(mealId) {
  try {
    // Base URL for the lookup endpoint
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

    // Create query parameters string
    const params = new URLSearchParams();
    params.append('i', mealId);

    // Full URL with parameters
    const url = `${baseUrl}?${params.toString()}`;

    // Make the API call
    const response = await axios.get(url);

    // Log and return the data
    console.log('Meal Details:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error fetching meal details:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export default fetchMealDetails;

