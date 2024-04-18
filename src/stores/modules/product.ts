import { defineStore } from "pinia";
import productService from "@/api/productService";

export const useProductStore = defineStore("product", {
  id: "product",
  state: () => ({
    products: [],
    categories: [],
    productStocks: [],
  }),

  getters: {
    getProductList: (state) => state.products,
  },

  actions: {
    async fetchProductList() {
      const request = await productService.getProductList();
      this.products = request.data
      this.updateProductStocks();
    },
    async addProductItem(productData) {
      try {
        const response = await productService.addProduct(productData);
        if (response.status === 200) {
          // 如果请求成功，这里可以根据实际返回结构调整
          this.products.push(response.data);
          // 也可以选择重新获取产品列表
          await this.fetchProductList();
        }
      } catch (error) {
        throw new Error("添加产品失败");
      }
    },
    async deleteProductItem(productId) {
      try {
        await productService.deleteProduct(productId);
      } catch (error) {
        console.error("Delete operation failed:", error);
      }
    },
    async updateProductItem(productId, productData) {
      try {
        const response = await productService.upDateProduct(
          productId,
          productData
        );
        if (response.status === 200) {
          // 更新成功后，可以选择更新本地状态或重新获取产品列表
          await this.fetchProductList();
        }
      } catch (error) {
        console.error("Update operation failed:", error);
      }
    },
    async getProductsByName(productName) {
      const request = await productService.getProductsByName(productName);
      this.products = request.data;
    },
    async getProductsByCategory(category) {
      const request = await productService.getProductsByCategory(category);
      this.products = request.data;
    },
    async getCategory() {
      const request = await productService.getCategory();
      this.categories = request.data;
    },
    async updateProductStocks() {
      this.productStocks = this.products.map((product) => ({
        name: product.productName, // 假设商品对象有一个 'name' 属性
        value: product.stockQuantity, // 假设商品对象有一个 'stockQuantity' 属性
      }));     
    },
  },
});
