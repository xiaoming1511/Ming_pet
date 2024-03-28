import { defineStore } from "pinia";
import productService from "@/api/productService";

export const useProductStore = defineStore("product", {
  id: "product",
  state: () => ({
    products: [],
  }),

  getters: {
    getProductList: (state) => state.products,
  },

  actions: {
    async fetchProductList(category = null) {
      let responseData = [];
      try {
        if (category) {
          const request = await productService.getProductsByCategory(category);
          responseData = request.data
            .map((product) => ({
              ...product,
              category:
                category === 1
                  ? "主粮"
                  : category === 4
                  ? "零食"
                  : product.category,
              quantity: 0,
            }))
            .filter((product) => product.status == true);
          return responseData;
        } else {
          // Fetch all products if no category is specified
          const response = await productService.getProductList();
          responseData = response.data.map((product) => ({
            ...product,
            quantity: 0,
          }));
          this.products = responseData;
        }
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
    },
  },
});
