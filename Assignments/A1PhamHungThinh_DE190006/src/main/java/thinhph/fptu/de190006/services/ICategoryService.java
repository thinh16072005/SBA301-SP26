package thinhph.fptu.de190006.services;

import thinhph.fptu.de190006.entities.Category;

import java.util.List;

public interface ICategoryService {
    Category createCategory(Category category);
    Category updateCategory(Long id, Category category);
    void deleteCategory(Long id);
    Category getCategoryById(Long id);
    List<Category> getAllCategories();
}
