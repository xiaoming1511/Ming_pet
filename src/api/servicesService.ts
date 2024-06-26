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
  updatePricing(id, serviceData) {
    return http.put(`pricing/update/${id}`, serviceData);
  }
  addPetServices(ServicesDate) {
    return http.post("petServices/add", ServicesDate);
  }
  deletePricing(pricingId) {
    return http.delete(`pricing/delete/${pricingId}`);
  }
}

export default new ServicesService();
