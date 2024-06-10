import React, { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "./api";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthTokenState] = useState(Cookies.get("token"));
  const [refreshToken, setRefreshTokenState] = useState(
    Cookies.get("refreshToken")
  );

  const refreshAuthToken = async () => {
    try {
      const response = await api.post("api/User/refresh-token", refreshToken, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.accessToken) {
        Cookies.set("token", response.data.accessToken);
        setAuthTokenState(response.data.accessToken);
        setAuthToken(response.data.accessToken);

        if (response.data.refreshToken) {
          Cookies.set("refreshToken", response.data.refreshToken);
          setRefreshTokenState(response.data.refreshToken);
        }
      }
      return response.data.token;
    } catch (err) {
      console.log("Error refreshing token:", err);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    setAuthTokenState(null);
    setRefreshTokenState(null);
    setAuthToken(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (refreshToken) {
        refreshAuthToken().catch(logout);
      }
    }, 30 * 1000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
