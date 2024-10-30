import axios from 'axios';

// Create an instance of axios with a custom base URL
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000', // Fallback to localhost in development
});

export default axiosInstance;
