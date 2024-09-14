import axios from "axios";
// Function to make a single API call with optional parameters (c, a, i)
async function filtredMealData(category = [], area = null, ingredient = null) {
    try {
      // Base URL
      const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php';
  
      // Create query parameters string dynamically
      const params = new URLSearchParams();
  
      // Add category parameter if provided
      if (category.length) {
        category.forEach(value => params.append('c', value));
      }
  
      // Add area parameter if provided
      if (area) {
        params.append('a', area);
      }
  
      // Add ingredient parameter if provided
      if (ingredient) {
        params.append('i', ingredient);
      }
  
      // Full URL with parameters
      const url = `${baseUrl}?${params.toString()}`;
  
      // Make the API call
      const response = await axios.get(url);
  
      // Log and return the data
      console.log('Data:', response.data);
      return response.data;
  
    } catch (error) {
      console.error('Error fetching meal data:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
  
  export default filtredMealData;
