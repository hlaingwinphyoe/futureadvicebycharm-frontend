import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_HOST;
// Token management in localStorage
const TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Store tokens in localStorage
export const setTokens = (token, refreshToken) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const publicHttp = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Retrieve token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Retrieve refresh token from localStorage
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Clear tokens from localStorage on logout
export const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Create authenticated API instance
const createApi = () => {
  // Create a new instance with the same config as the base PUBLICHTTP client
  const api = axios.create({
    baseURL: publicHttp.defaults.baseURL,
    timeout: publicHttp.defaults.timeout,
    headers: {
      ...publicHttp.defaults.headers,
    },
  });

  // Request interceptor to add auth token to requests
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token refresh on 401 errors
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 Unauthorized and we haven't retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            // No refresh token available, user needs to log in again
            removeTokens();
            // You might want to redirect to login or dispatch a logout action here
            return Promise.reject(error);
          }

          // Call your token refresh endpoint using the public publicHttp client
          const response = await publicHttp.post("/api/refresh-token", {
            refresh_token: refreshToken,
          });

          // Store the new tokens
          const { token, refreshToken: newRefreshToken } = response.data;
          setTokens(token, newRefreshToken);

          // Update the authorization header and retry the original request
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If refresh token is invalid, clear tokens and redirect to login
          removeTokens();
          // You might want to redirect to login or dispatch a logout action here
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

// Create an instance of the authenticated API
export const http = createApi();
