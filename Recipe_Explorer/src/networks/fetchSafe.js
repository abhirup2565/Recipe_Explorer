import axios from "axios";

// Create Axios instance
const fetchSafe = axios.create({
  timeout: 5000, // 5-second timeout
});

// Interceptor for handling responses and errors globally
fetchSafe.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Timeout Error: Request took too long");
      throw new Error("Request timed out. Please try again.");
    } else if (!error.response) {
      console.error("Network Error: Check your internet connection");
      throw new Error("Network error. Please check your connection.");
    } else if (error.response.status >= 500) {
      console.error(`Server Error (${error.response.status})`);
      throw new Error("Server error. Please try again later.");
    } else {
      throw error;
    }
  }
);

export default fetchSafe;
