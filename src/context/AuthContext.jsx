import { createContext, useContext, useState, useEffect } from "react";
import { http, getToken, getRefreshToken, removeTokens } from "../utils/axios";
import { useDispatch } from "react-redux";
import { login } from "@/redux/reducers/UserSlice";
import PageLoading from "@/components/PageLoading";

const AuthContext = createContext(null);

// Maximum time to wait for authentication check
const AUTH_CHECK_TIMEOUT = 3000;

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = (user) => {
    if (!user) {
      clearAuth();
      return;
    }
    setIsAuthenticated(true);
    dispatch(login.fulfilled({ user }, "", {}));
  };

  const clearAuth = () => {
    setIsAuthenticated(false);
    removeTokens();
    dispatch({ type: "user/logout" });
  };

  useEffect(() => {
    let timeoutId;
    let isSubscribed = true;

    const checkAuth = async () => {
      try {
        const token = getToken();
        const refreshToken = getRefreshToken();

        // Clear auth if no tokens exist
        if (!token && !refreshToken) {
          clearAuth();
          return;
        }

        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (isSubscribed) {
            console.warn("Auth check timed out");
            clearAuth();
            setIsLoading(false);
          }
        }, AUTH_CHECK_TIMEOUT);

        try {
          // First attempt with access token
          const response = await http.get("/api/auth/user");
          if (isSubscribed) {
            updateUser(response.data.data);
          }
        } catch (error) {
          // If token is invalid and we have refresh token
          if (error.response?.status === 401 && refreshToken) {
            try {
              // Let the interceptor handle the refresh
              const response = await http.get("/api/auth/user");
              if (isSubscribed) {
                updateUser(response.data.data);
              }
            } catch (refreshError) {
              // If refresh fails, clear auth
              if (isSubscribed) {
                console.error("Token refresh failed:", refreshError);
                clearAuth();
              }
            }
          } else {
            // For any other error, clear auth
            if (isSubscribed) {
              console.error("Auth check failed:", error);
              clearAuth();
            }
          }
        }
      } catch (error) {
        if (isSubscribed) {
          console.error("Auth check failed:", error);
          clearAuth();
        }
      } finally {
        if (isSubscribed) {
          clearTimeout(timeoutId);
          setIsLoading(false);
        }
      }
    };

    // Initialize auth interceptors before checking auth
    // setupAuthInterceptors(updateUser, clearAuth);
    checkAuth();

    // Cleanup function
    return () => {
      isSubscribed = false;
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateUser, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
