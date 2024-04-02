import http from "@/utils/request"; // 导入您之前定义的axios实例

class employeeService {
  getemployeeList() {
    return http.get("/employee");
  }
  addEmployee(EmployeeData) {
    return http.post("employee/add", EmployeeData);
  }
  updateEmployee(id, EmployeeData) {
    return http.put(`employee/update/${id}`, EmployeeData);
  }
  deleteEmployee(id) {
    return http.delete(`employee/delete/${id}`);
  }
  getBySearch(search) {
    return http.get("/employee/search", { params: { search } });
  }
}

export default new employeeService();
