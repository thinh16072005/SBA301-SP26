package thinhph.fptu.springdemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import thinhph.fptu.springdemo.entity.Product;
import thinhph.fptu.springdemo.repository.IProductRepository;

import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public void saveProducts() {
        productRepository.addProducts();
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }

    @Override
    public Product getProductById(int id) {
        return productRepository.getProductById(id);
    }

    @Override
    public String deleteProductById(int id) {
        return productRepository.deleteProductById(id);
    }

    @Override
    public Product updateProduct(Product product) {
        return productRepository.updateProduct(product);
    }
}
