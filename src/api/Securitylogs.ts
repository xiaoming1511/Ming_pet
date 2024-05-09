import http from "@/utils/request";

class SecurityLogsService {
  getSecurityLogs() {
    return http.get("/securityLogs/log");
  }
}

export default new SecurityLogsService();
