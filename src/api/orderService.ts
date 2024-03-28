import http from "@/utils/request"; // 导入您之前定义的axios实例

class orderService {
  getOrderList() {
    return http.get("/orders");
  }
  addOrder(orderData) {
    return http.post("/orders/create", orderData);
  }
  deleteOrder(OrderId) {
    return http.delete(`/orders/delete/${OrderId}`);
  }
}

export default new orderService();
