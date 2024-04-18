import http from "@/utils/request"; // 导入您之前定义的axios实例

class orderService {
  getOrderList() {
    return http.get("/orders");
  }
  searchByDate(startDate, endDate) {
    return http.get("/orders/searchByDate", {
      params: { startDate, endDate },
    });
  }
  searchByKey(keyword) {
    return http.get("/orders/searchByKey", { params: { keyword } });
  }
  addOrder(orderData) {
    return http.post("/orders/create", orderData);
  }
  deleteOrder(OrderId) {
    return http.delete(`/orders/delete/${OrderId}`);
  }
  salesByDate(date) {
    return http.get("/orders/salesByDate", { params: { date } });
  }
}

export default new orderService();
