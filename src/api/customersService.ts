import http from "@/utils/request"; // 导入您之前定义的axios实例

class customersService {
  getCustomersList() {
    return http.get("/customers");
  }
  addCustomersItem(CustomersDate) {
    return http.post("/customers/add", CustomersDate);
  }
  upDateCustomersItem(customersId, CustomersDate) {
    return http.put(`/customers/update/${customersId}`, CustomersDate);
  }
  deleteCustomersItem(customersId) {
    return http.delete(`/customers/delete/${customersId}`);
  }
}

export default new customersService();
