package thinhph.fptu.springdemo.service;

import thinhph.fptu.springdemo.entity.Product;

import java.util.List;

public interface IProductService {
    void saveProducts();
    List<Product> getAllProducts();
    Product getProductById(int id);
    String deleteProductById(int id);
    Product updateProduct(Product product);
}
