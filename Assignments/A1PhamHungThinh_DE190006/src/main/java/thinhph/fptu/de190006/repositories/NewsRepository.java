package thinhph.fptu.de190006.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import thinhph.fptu.de190006.entities.NewsArticle;

public interface NewsRepository extends JpaRepository<NewsArticle, Long> {
}
