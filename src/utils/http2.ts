import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useUserStore } from "@/store";
import router from "@/router";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL2,
  timeout: 5000,
});

export const $http: any = async (config: AxiosRequestConfig) => {
  const userStore = useUserStore();
  const token = userStore.token;
  try {
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const res = await http(config);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorDetail = error.response?.data.detail;
      if (errorDetail instanceof Array) {
        console.log(errorDetail);
      } else {
        console.log(error.response?.data.detail);
      }
      if (error.response?.status === 401) {
        userStore.logout();
        router.push("/chat");
      }
    }
    return Promise.reject(error);
  }
};
