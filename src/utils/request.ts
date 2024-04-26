import router from "@/router";
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

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
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 不对登录接口添加token
    if (config.url !== "/login" && config.url !== "/user/login") {
      // 确保匹配到准确的登录路由
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["token"] = token;
      }
    }
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
    if (code !== 200) {
      ElMessage.error(msg || "系统出错");
      router.push("/login");
      return Promise.reject(new Error(msg || "Error"));
    }
    return response.data;
  },
  (error: any) => {
    console.log("error", error);

    // 如果响应状态码是401，进行相应处理，比如跳转到登录页
    // if (error.response?.status === 401) {
    //   // 可能需要清除本地存储的状态
    //   localStorage.clear();
    //   ElMessage.error("登录已过期，请重新登录");
    //   // 如果你使用Vue Router可以如此跳转
    //   router.push("/login");
    // } else {
    //   // 对于其他类型的响应错误，显示错误消息
    //   ElMessage.error(error.message);
    // }
    // return Promise.reject(error);
  }
);

// 导出 axios 实例
export default http;
