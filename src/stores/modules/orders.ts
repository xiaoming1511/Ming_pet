import { defineStore } from "pinia";
import ordersService from "@/api/orderService";

export const useOrdersStore = defineStore("orders", {
  id: "orders",
  state: () => ({
    orders: [],
  }),

  getters: {
    getOrders: (state) => state.orders,
  },

  actions: {
    async fetchOrders() {
      try {
        const response = await ordersService.getOrderList();
        this.orders = response.data;
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    },
  },
});
