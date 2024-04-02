import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { env } from "process";

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
  baseURL: 'http://localhost:7777',
  timeout: 50000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 一般在这个位置判断token是否存在
    // console.log(config + "token存在");
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    const { code, msg } = response.data;
    if (code == 200) {
      return response.data;
    } else {
      return Promise.reject(new Error(msg || "Error"));
    }
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error.message);
  }
);

// 导出 axios 实例
export default http;
