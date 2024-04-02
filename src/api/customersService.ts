import http from "@/utils/request"; // 导入您之前定义的axios实例

class customersService {
  getCustomersList() {
    return http.get("/customers");
  }
  addCustomersItem(CustomersData) {
    return http.post("/customers/add", CustomersData);
  }
  upDateCustomersItem(customersId, CustomersData) {
    return http.put(`/customers/update/${customersId}`, CustomersData);
  }
  deleteCustomersItem(customersId) {
    return http.delete(`/customers/delete/${customersId}`);
  }
  getBySearch(search) {
    return http.get("/customers/search", { params: { search } });
  }
}

export default new customersService();
