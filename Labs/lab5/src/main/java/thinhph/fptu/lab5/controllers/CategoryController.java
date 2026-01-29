package thinhph.fptu.lab5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.lab5.pojos.Category;
import thinhph.fptu.lab5.services.ICategoryService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/categories")
public class CategoryController {
    private final ICategoryService categoryService;

    @Autowired
    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> fetchAll(){
        return categoryService.getAllCategories().isEmpty() ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(categoryService.getAllCategories());
    }

}
