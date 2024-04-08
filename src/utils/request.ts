import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

interface Result {
  code: number;
  msg: string;
}

interface ResultData<T = any> extends Result {
  data?: T;
}
const URL: string = "";
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}

const http = axios.create({
  baseURL: "http://localhost:7777",
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 使用 console.log 输出请求配置
    console.log("Request config:", config);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 使用 console.log 输出响应数据
    console.log("Response data:", response.data);
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default http;
