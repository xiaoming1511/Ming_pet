import { defineStore } from "pinia";
import servicesService from "@/api/servicesService";

export const useServicesStore = defineStore("services", {
  id: "services",
  state: () => ({
    servicesList: [],
    servicesTypeList: [],
    selectedServiceTypeId: null,
    selectedValue: [],
    selectedServices: [],
    petDates: {},
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
        return response.data.serviceId;
      } catch (error) {
        console.error("添加服务时出错:", error);
        // throw error; // 抛出错误，由调用者处理
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
    },
    async submitNewServiceAndPricing(serviceData, pricingItems) {
      try {
        // 添加服务并获取新服务的 ID
        const serviceId = await this.addServices(serviceData);
        if (!serviceId) {
          throw new Error("服务添加失败，未获得服务 ID。");
        }
        // 如果提供了价目表项，添加它们
        if (pricingItems.length > 0) {
          const pricingDataWithServiceId = pricingItems.map((item) => ({
            ...item,
            servicesId: serviceId,
          }));
          await this.addPricingItem(pricingDataWithServiceId);
        }
        return serviceId; // 返回新服务的 ID 以便进一步操作
      } catch (error) {
        console.error("添加服务或价目表时出错:", error);
        throw error; // 抛出错误，由调用者处理
      }
    },
    async updatePricingItem(serviceData) {
      const updatePromises = serviceData.map((item) => {
        const { pricingId, ...data } = item;
        servicesService.updatePricing(pricingId, data);
      });
    },
    async addPetServices(servicesData) {
      const request = await servicesService.addPetServices(servicesData);
      return request;
    },
    updatePetDate(petId, date) {
      // 将日期更新为选定的宠物
      this.petDates[petId] = date;
    },
    async deletePricing(pricingId) {
      const request = await servicesService.deletePricing(pricingId);
      return request.data;
    },
  },
});
