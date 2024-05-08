import http from "@/utils/request"; // 导入您之前定义的axios实例

class LoginService {
  login(data) {
    return http.post("/user/login", data);
  }
  logout() {
    return http.post("/user/logout");
  }
  register(data) {
    return http.post("/user/register", data);
  }
  updatedUserInfo(id, data) {
    return http.put(`/user/${id}`, data);
  }
}

export default new LoginService();
