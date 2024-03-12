import { defineStore } from "pinia";
import servicesService from "@/api/servicesService";

export const useServicesStore = defineStore("services", {
  id: "services",
  state: () => ({
    servicesList: [],
    servicesTypeList: [],
    selectedServiceTypeId: null,
  }),

  getters: {
    getAllServicesList: (state) => state.servicesList,
    getServicesTypeList: (state) => state.servicesTypeList,
  },

  actions: {
    async fetchServicesList(serviceTypeId) {
      try {
        const response = await servicesService.getAllServicesList(
          serviceTypeId
        );
        this.servicesList = response.data;
      } catch (error) {
        console.error(
          `Fetching services failed for type ID ${serviceTypeId}:`,
          error
        );
      }
    },
    async fetchServicesTypeList() {
      try {
        const response = await servicesService.getServicesTypeList();
        this.servicesTypeList = response.data;
        // 确保响应数据不为空
        if (this.servicesTypeList.length > 0) {
          this.selectedServiceTypeId = this.servicesTypeList[0].serviceTypeId;
          console.log(this.selectedServiceTypeId);
          await this.fetchServicesList(this.selectedServiceTypeId);
        }
      } catch (error) {
        console.error("Fetching service types failed:", error);
      }
    },
  },
});
