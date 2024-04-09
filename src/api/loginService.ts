import http from "@/utils/request"; // 导入您之前定义的axios实例

class LoginService {
  login(data) {
    return http.post("/user/login", data);
  }
  logout() {
    return http.post("/user/logout");
  }
}

export default new LoginService();
