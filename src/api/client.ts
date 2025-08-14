import axios from "axios";

export const createApiClient = (apiKey: string) => {
  if (!apiKey) {
    console.warn("⚠️ No API key provided to createApiClient");
  }

  const api = axios.create({
    baseURL: "https://biz.api.simpoocodes.com/api/v1/outbound",
    headers: {
      "Content-Type": "application/json",
      "SIMPOO-API-KEY": apiKey,
    },
  });

  api.interceptors.request.use(
    (config) => {
      if (apiKey && config.headers) {
        config.headers["SIMPOO-API-KEY"] = apiKey;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Add Response Interceptor for Consistent Error Handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error("API Error:", error.response.status, error.response.data);
      } else {
        console.error("Network or Axios Error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return api;
};
