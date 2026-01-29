package thinhph.fptu.lab5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import thinhph.fptu.lab5.pojos.Category;
import thinhph.fptu.lab5.repositories.ICategoryRepository;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    private final ICategoryRepository repository;

    @Autowired
    public CategoryService(ICategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Category> getAllCategories() {
        return repository.findAll();
    }
}
