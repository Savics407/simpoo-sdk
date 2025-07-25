import axios from "axios";

export const createApiCLient = (apiKey: string) => {
  const api = axios.create({
    baseURL: "https://biz.api.simpoocodes.com/api/gateway/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    if (config.headers) {
      config.headers["SIMPOO-API-KEY"] = apiKey;
    }
    return config;
  });

  return api;
};
