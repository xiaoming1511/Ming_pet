import http from "@/utils/request"; // 导入您之前定义的axios实例

class ServicesService {
  getAllServicesList(serviceTypeId) {
    return http.get("services/getServicesByType/" + serviceTypeId);
  }
  getServicesTypeList() {
    return http.get("services/getServicesTypeList");
  }
}

export default new ServicesService();
