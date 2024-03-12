import { defineStore } from "pinia";
import productService from "@/api/productService";

export const useProductStore = defineStore("product", {
  id: "product",
  state: () => ({
    products: [],
    editShowModal: ref(false),
    editList: [],
  }),

  getters: {
    getProductList: (state) => state.products,
  },

  actions: {
    async fetchProductList() {
      try {
        const response = await productService.getProductList();
        this.products = response.data;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
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
    async updateProductItem(productId,productData) {
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
  },
});
