import axios from "axios";
import { useUserStore } from "../stores/userStore";

// Create an Axios instance with a common base URL

const ApiUrl = "https://localhost:7171/"; 

const apiClient = axios.create({
  baseURL: ApiUrl + "ExpenseTracker", // Replace with your actual API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
