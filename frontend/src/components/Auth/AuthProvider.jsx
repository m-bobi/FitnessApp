import React, { createContext, useState, useEffect } from 'react';
import api, { setAuthToken } from './api';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthTokenState] = useState(Cookies.get('token'));
  const [refreshToken, setRefreshTokenState] = useState(Cookies.get('refreshToken'));

 const refreshAuthToken = async () => {
    const response = await api.post('/api/User/refresh-token', { token: refreshToken });
    if (response.data.accessToken) {
      Cookies.set('token', response.data.accessToken);
      setAuthTokenState(response.data.accessToken);
      setAuthToken(response.data.accessToken);
    }
    return response.data.token;
  };
  
 const logout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
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
  }, [refreshToken]);

  

  return (
    <AuthContext.Provider value={{ authToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;