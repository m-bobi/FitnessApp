import axios from "axios";
import config from "../../config";
import AuthProvider from './AuthProvider';

const api = axios.create({
  baseURL: config.apiBaseURL,
});


export function setAuthToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}


api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await AuthProvider.refreshAuthToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        AuthProvider.logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
