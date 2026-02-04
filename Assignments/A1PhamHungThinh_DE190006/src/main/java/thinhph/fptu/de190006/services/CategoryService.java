package thinhph.fptu.de190006.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import thinhph.fptu.de190006.entities.Category;
import thinhph.fptu.de190006.repositories.CategoryRepository;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        return categoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setCategoryName(category.getCategoryName());
                    existingCategory.setCategoryDescription(category.getCategoryDescription());
                    return categoryRepository.save(existingCategory);
                })
                .orElse(null);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
