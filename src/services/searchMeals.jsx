import axios from 'axios';

// Function to search for meals by name, and if not found, search by the first letter
async function searchMeals(query) {
  try {
    // Base URL for the search endpoint
    const baseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php';

    // Function to make an API call with specific query parameters
    const makeApiCall = async (params) => {
      const url = `${baseUrl}?${params.toString()}`;
      return await axios.get(url);
    };

    // Search by name
    let params = new URLSearchParams();
    params.append('s', query);
    let response = await makeApiCall(params);
    
    // If no meals are found, search by the first letter
    if (!response.data.meals) {
      const firstLetter = query.charAt(0).toLowerCase();
      
      params = new URLSearchParams();
      params.append('f', firstLetter);
      response = await makeApiCall(params);
    }

    // Log and return the data
    console.log('Search Results:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error searching meals:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

export default searchMeals;