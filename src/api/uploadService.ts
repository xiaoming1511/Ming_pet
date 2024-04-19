import http from "@/utils/request"; // 导入您之前定义的axios实例

class upLoadService {
  upLoadImage(data) {
    return http.post("/upload/img", data);
  }
}

export default new upLoadService();
