package thinhph.fptu.de190006.services;

import org.springframework.data.jpa.repository.JpaRepository;
import thinhph.fptu.de190006.entities.NewsArticle;

import java.util.List;

public interface INewsService {
    NewsArticle createNews(NewsArticle news);
    NewsArticle updateNews(Long id, NewsArticle news);
    void deleteNews(Long id);
    NewsArticle getNewsById(Long id);
    List<NewsArticle> getAllNews();
}
