package thinhph.fptu.de190006.services;

import org.springframework.stereotype.Service;
import thinhph.fptu.de190006.entities.NewsArticle;
import thinhph.fptu.de190006.repositories.NewsRepository;

import java.util.List;

@Service
public class NewsService implements INewsService {
    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Override
    public NewsArticle createNews(NewsArticle news) {
        return newsRepository.save(news);
    }

    @Override
    public NewsArticle updateNews(Long id, NewsArticle news) {
        return newsRepository.findById(id)
                .map(existingNews -> {
                    existingNews.setNewsTitle(news.getNewsTitle());
                    existingNews.setHeadline(news.getHeadline());
                    existingNews.setCategory(news.getCategory());
                    existingNews.setNewsContent(news.getNewsContent());
                    existingNews.setNewsSource(news.getNewsSource());
                    return newsRepository.save(existingNews);
                })
                .orElse(null);
    }

    @Override
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }

    @Override
    public NewsArticle getNewsById(Long id) {
        return newsRepository.findById(id).orElse(null);
    }

    @Override
    public List<NewsArticle> getAllNews() {
        return newsRepository.findAll();
    }
}
