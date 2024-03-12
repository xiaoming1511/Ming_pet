import http from "@/utils/request"; // 导入您之前定义的axios实例

class customersService {
  getcustomersList() {
    return http.get("/customers");
  }
}

export default new customersService();
