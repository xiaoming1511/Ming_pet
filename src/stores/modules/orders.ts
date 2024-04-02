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
        const request = await ordersService.getOrderList();
        this.orders = request.data;
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    },
    async addOrder(orderData) {
      const request = await ordersService.addOrder(orderData);
    },
    async deleteOrder(orderId) {
      const request = await ordersService.deleteOrder(orderId);
    },
    async searchByDate(startDate, endDate) {
      const request = await ordersService.searchByDate(startDate, endDate);
      this.orders = request.data;
    },
    async searchByKey(keyword) {
      const request = await ordersService.searchByKey(keyword);
      this.orders = request.data
    },
  },
});
