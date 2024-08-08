import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://akil-backend.onrender.com/', // Replace with your actual base URL
});

export default axiosInstance;
