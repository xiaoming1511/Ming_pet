import http from "@/utils/request"; // 导入您之前定义的axios实例

class productService {
  getProductList() {
    return http.get("/products/list");
  }
  getProductsByCategory(category) {
    return http.get("/products/searchByCategory", {
      params: { category },
    });
  }
  getProductsByName(productName) {
    return http.get("/products/searchByName", {
      params: { name: productName },
    });
  }
  getCategory(){
    return http.get("/products/categories");
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
