import axios from "axios";
import { store } from "../redux/app/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const authFreeRoutes = [
  "/auth/login",
  "/auth/refresh",
  "/auth/send-otp",
  "/auth/verify-otp",
  "/admin/login" 
];

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    if (authFreeRoutes.some(route => config.url.includes(route))) {
      return config;
    }

    const token = store.getState().user.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (authFreeRoutes.some(route => originalRequest.url.includes(route))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await api.post("/auth/refresh");
        const { user, accessToken } = refreshRes.data;

        store.dispatch({
          type: "SET_USER",
          payload: { user, accessToken },
        });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch({ type: "LOGOUT" });
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
