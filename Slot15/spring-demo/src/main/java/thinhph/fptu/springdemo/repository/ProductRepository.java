package thinhph.fptu.springdemo.repository;

import org.springframework.stereotype.Repository;
import thinhph.fptu.springdemo.entity.Product;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepository implements IProductRepository {
    private List<Product> products = new ArrayList<>();

    @Override
    public void addProducts() {
        products = new ArrayList<>(List.of(
                new Product(1, "product 1", "description 1", 10, 100.0),
                new Product(2, "product 2", "description 2", 20, 200.0),
                new Product(3, "product 3", "description 3", 30, 300.0)
        ));
    }

    @Override
    public Product getProductById(int id) {
        for (Product product : products) {
            if (product.getId() == id) {
                return product;
            }
        }
        return null;
    }

    @Override
    public List<Product> searchProductByName(String name) {
        List<Product> result = new ArrayList<>();
        for (Product product : products) {
            if (product.getName().toLowerCase().contains(name.toLowerCase())) {
                result.add(product);
            }
        }
        return result;
    }

    @Override
    public List<Product> getAllProducts() {
        return products;
    }

    @Override
    public String deleteProductById(int id) {
        Product product = getProductById(id);
        if (product != null) {
            products.remove(product);
            return "Product with ID " + id + " has been deleted.";
        } else {
            return "Product with ID " + id + " not found.";
        }
    }

    @Override
    public Product updateProduct(Product product) {
        Product updatedProduct = getProductById(product.getId());
        if (updatedProduct == null) return null;

        updatedProduct.setName(product.getName());
        updatedProduct.setDescription(product.getDescription());
        updatedProduct.setQuantity(product.getQuantity());
        updatedProduct.setPrice(product.getPrice());
        return updatedProduct;
    }
}
