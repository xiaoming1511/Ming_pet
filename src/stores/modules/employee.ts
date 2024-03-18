import { defineStore } from "pinia";
import employeeService from "@/api/employeeService";

export const useemployeeStore = defineStore("employee", {
  id: "employee",
  state: () => ({
    employee: [],
  }),

  getters: {
    getemployee: (state) => state.employee,
  },

  actions: {
    async fetchemployee() {
      try {
        const response = await employeeService.getemployeeList();
        this.employee = response.data;
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      }
    },
    async addEmployee(EmployeeDate) {
      const request = await employeeService.addEmployee(EmployeeDate);
    },
    async updateEmployeeInfo(id, EmployeeDate) {
      const request = await employeeService.updateEmployee(id, EmployeeDate);
    },
    async deleteEmployeeInfo(id) {
      const request = await employeeService.deleteEmployee(id);
    },
  },
});
