package thinhph.fptu.springdemo.repository;

import thinhph.fptu.springdemo.entity.Product;

import java.util.List;

public interface IProductRepository {
    void addProducts();
    Product getProductById(int id);
    List<Product> searchProductByName(String name);
    List<Product> getAllProducts();
    String deleteProductById(int id);
    Product updateProduct(Product product);
}
