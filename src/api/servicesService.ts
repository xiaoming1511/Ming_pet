import http from "@/utils/request"; // 导入您之前定义的axios实例

class ServicesService {
  getAllServicesList(serviceTypeId) {
    return http.get(`services/getServicesByType/${serviceTypeId}`);
  }
  getServicesTypeList() {
    return http.get("services/getServicesTypeList");
  }
  addServices(ServicesDate) {
    return http.post("services/add", ServicesDate);
  }
  deleteService(servicesId) {
    return http.delete(`services/delete/${servicesId}`);
  }
  getByIdPricingList(servicesId) {
    return http.get(`pricing/byIdList/${servicesId}`);
  }
  addPricing(serviceData) {
    return http.post("pricing/add", serviceData);
  }
}

export default new ServicesService();
