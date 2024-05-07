import http from "@/utils/request"; // 导入您之前定义的axios实例

class petsService {
  getPetsList() {
    return http.get("/pets/list");
  }
  getpetsServiceList(serviceDate) {
    return http.get("/petServices/byDate", { params: { serviceDate } });
  }
  getpetsbyDateRangeServiceList(startDate, endDate) {
    return http.get("/petServices/byDateRange", {
      params: { startDate, endDate },
    });
  }
  addPet(petDate) {
    return http.post("pets/add", petDate);
  }
  updatePetsInfo(petId, petDate) {
    return http.put(`pets/update/${petId}`, petDate);
  }
  getPetByDateRange(startDate, endDate) {
    return http.get("/pets/byDateRange", {
      params: { startDate, endDate },
    });
  }
  getPetByKeyword(keyWord) {
    return http.get("/pets/byKeyword", { params: { keyWord } });
  }
  getPetByCategory(category) {
    return http.get("/pets/byCategory", {
      params: { category },
    });
  }
  deleteByid(petId) {
    return http.delete(`/pets/delete/${petId}`);
  }
  getPetsByFilters(filters) {
    const params = new URLSearchParams();

    // 构建查询参数
    if (filters.dateRange) {
      params.append("startDate", filters.dateRange.startDate);
      params.append("endDate", filters.dateRange.endDate);
    }
    if (filters.keyword) {
      params.append("keyword", filters.keyword);
    }
    if (filters.category) {
      params.append("category", filters.category);
    }

    return http.get("/pets/byFilters", { params });
  }
}

export default new petsService();
