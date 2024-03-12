import http from "@/utils/request"; // 导入您之前定义的axios实例

class productService {
  getProductList() {
    return http.get("/products");
  }
  addProduct(productData) {
    return http.post("/products/add", productData);
  }
  deleteProduct(productId) {
    return http.delete(`/products/delete/${productId}`);
  }
  upDateProduct(productId, productData) {
    return http.put(`/products/update/${productId}`, productData);
  }
}

export default new productService();
