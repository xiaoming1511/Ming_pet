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
          await this.fetchServicesList(this.selectedServiceTypeId);
        }
      } catch (error) {
        console.error("Fetching service types failed:", error);
      }
    },
    async addServices(servicesData) {
      try {
        const response = await servicesService.addServices(servicesData);
        if (response.status === 200) {
          // 如果API调用成功，可以选择将新服务添加到服务列表中
          this.servicesList.push(response.data);
          // 或者重新获取服务列表
          await this.fetchServicesList(this.selectedServiceTypeId);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteService(servicesId) {
      try {
        const response = await servicesService.deleteService(servicesId);
        if (response.status === 200) {
          // 或者重新获取服务列表
          await this.fetchServicesList(this.selectedServiceTypeId);
        }
      } catch (error) {
        console.error(error);
        // 这里可以处理错误，例如显示错误消息
      }
    },
    async getByIdPricingList(servicesId) {
      try {
        const response = await servicesService.getByIdPricingList(servicesId);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addPricingItem(serviceData) {
      const request = await servicesService.addPricing(serviceData);
      console.log(request);
    }
  },
});
