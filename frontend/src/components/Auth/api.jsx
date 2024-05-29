import axios from "axios";
import config from "../../config";

const api = axios.create({
  baseURL: config.apiBaseURL,
});

export function setAuthToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
