import http from "@/utils/request"; // 导入您之前定义的axios实例

class petsService {
  getPetsList() {
    return http.get("/pets/list");
  }
  getpetsServiceList() {
    return http.get("/petServices");
  }
  addPet(petDate) {
    return http.post("pets/add", petDate);
  }
  updatePetsInfo(petId, petDate) {
    return http.put(`pets/update/${petId}`, petDate);
  }
}

export default new petsService();
