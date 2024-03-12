import http from "@/utils/request"; // 导入您之前定义的axios实例

class employeeService {
  getemployeeList() {
    return http.get("/employee");
  }
}

export default new employeeService();
