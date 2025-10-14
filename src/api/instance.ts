import axios from "axios";
import { API_BASE_URL } from "@/constants/config";
import { ROUTES_PATH } from "@/utils/routesPath";

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 35000,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 401) {
        console.error("Unauthorized");
        localStorage.clear();
        if (window.location.href !== "/") {
          window.location.href = ROUTES_PATH.AUTH.LOGIN;
        }
        console.error(
          response.data?.message || "Something went wrong. Try Later"
        );
      } else if (response.status === 400) {
        const errorMessage =
          response.data?.message || "Something went wrong. Try Later";
        console.error(errorMessage);
      } else {
        console.error(
          response.data?.message || "Something went wrong. Try Later"
        );
      }
    } else {
      console.error("Network error");
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
