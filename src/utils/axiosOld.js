import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = import.meta.env.VITE_SERVER_HOST;
const TOKEN_KEY = "sessionKey";
const REFRESH_TOKEN_KEY = "sessionId";

// Create base API instance with common config
const createAPI = (config = {}) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...config.headers,
    },
    ...config,
  });
};

// Public API instance
export const publicHttp = createAPI();

// Protected API instance
export const http = createAPI();

// Token management
export const getToken = () => Cookies.get(TOKEN_KEY);
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);

export const setTokens = (accessToken, refreshToken) => {
  if (accessToken) {
    Cookies.set(TOKEN_KEY, accessToken, {
      secure: true,
      sameSite: "strict",
      expires: 1, // Keep for 1 hours
    });
  }
  if (refreshToken) {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      secure: true,
      sameSite: "strict",
      expires: 7, // Keep for 7 days
    });
  }
};

export const removeTokens = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Setup auth interceptors
export const setupAuthInterceptors = (updateUser, clearAuth) => {
  // Request interceptor to add token
  http.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for handling auth errors
  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is not 401 or request already retried, reject
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // If refreshing, queue the request
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return publicHttp(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await publicHttp.post("/api/refresh-token", {
          refresh_token: refreshToken,
        });

        const { access_token } = response.data;
        setTokens(access_token, refreshToken);

        // Update auth header for original request
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // Process queued requests
        processQueue(null, access_token);

        return publicHttp(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuth();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};
