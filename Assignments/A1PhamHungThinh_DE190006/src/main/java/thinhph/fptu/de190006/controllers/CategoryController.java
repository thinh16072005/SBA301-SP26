package thinhph.fptu.de190006.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.de190006.entities.Category;
import thinhph.fptu.de190006.services.ICategoryService;

import java.util.List;

@Controller
@RequestMapping("/categories")
@CrossOrigin
public class CategoryController {
    private final ICategoryService categoryService;

    @Autowired
    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return categoryService.getAllCategories().isEmpty() ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id) == null ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        return ResponseEntity.ok(categoryService.updateCategory(id, category));
    }

    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }
}
