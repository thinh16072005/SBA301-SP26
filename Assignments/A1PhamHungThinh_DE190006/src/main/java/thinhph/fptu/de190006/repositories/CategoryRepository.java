package thinhph.fptu.de190006.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import thinhph.fptu.de190006.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
