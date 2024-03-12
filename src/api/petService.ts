import http from "@/utils/request"; // 导入您之前定义的axios实例

class petsService {
  getPetsList() {
    return http.get("/pets/list");
  }
  getpetsServiceList() {
    return http.get("/petServices");
  }
}

export default new petsService();
