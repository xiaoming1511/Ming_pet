import http from "@/utils/request"; // 导入您之前定义的axios实例

class employeeService {
  getemployeeList() {
    return http.get("/employee");
  }
  addEmployee(EmployeeDate) {
    return http.post("employee/add", EmployeeDate);
  }
  updateEmployee(id, EmployeeDate) {
    return http.put(`employee/update/${id}`, EmployeeDate);
  }
  deleteEmployee(id) {
    return http.delete(`employee/delete/${id}`);
  }
}

export default new employeeService();
