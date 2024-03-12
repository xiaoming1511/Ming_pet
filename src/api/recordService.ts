import http from "@/utils/request"; // 导入您之前定义的axios实例

class RecordsService {
  getRecordsList() {
    return http.get("/records");
  }
}

export default new RecordsService();
