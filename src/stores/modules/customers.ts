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
        const response = await customersService.getcustomersList();
        this.customers = response.data;
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    },
  },
});
