import http from "@/utils/request"; // 导入您之前定义的axios实例

class orderService {
  getOrderList() {
    return http.get("/orders");
  }
}

export default new orderService();
