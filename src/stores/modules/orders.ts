import { defineStore } from "pinia";
import ordersService from "@/api/orderService";
import { DateUtils } from "@/utils/dateUtils";

export const useOrdersStore = defineStore("orders", {
  id: "orders",
  state: () => ({
    orders: [],
    salesData: [],
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
      this.orders = request.data;
    },
    async salesByDate(date) {
      const request = await ordersService.salesByDate(date);
      return request.data;
    },
    async fetchDateSales() {
      try {
        const lastSevenDays = DateUtils.getLastSevenDays();
        const salesPromises = lastSevenDays.map((day) =>
          ordersService.salesByDate(day)
        );
        const dateSalesResponses = await Promise.all(salesPromises);
        this.salesData = dateSalesResponses.map((response) => response.data);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    },
    async updateSalesData() {
      // 当购买请求发起后，重新获取最新的销售数据
      await this.fetchDateSales();
    },
  },
});
