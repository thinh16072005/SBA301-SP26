package thinhph.fptu.lab5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import thinhph.fptu.lab5.pojos.Category;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
}
