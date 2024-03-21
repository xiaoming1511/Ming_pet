import { defineStore } from "pinia";
import customersService from "@/api/customersService";

export const usecustomersStore = defineStore("customers", {
  id: "customers",
  state: () => ({
    customers: [],
  }),

  getters: {
    getcustomers: (state) => state.customers,
  },

  actions: {
    async fetchcustomers() {
      try {
        const response = await customersService.getCustomersList();
        this.customers = response.data;
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    },
    async addCustomersItem(CustomersDate) {
      const request = await customersService.addCustomersItem(CustomersDate);
    },
    async upDateCustomersItem(customersId, CustomersDate) {
      const request = await customersService.upDateCustomersItem(
        customersId,
        CustomersDate
      );
    },
    async deleteCustomersItem(customersId) {
      const request = await customersService.deleteCustomersItem(customersId);
    },
  },
});
