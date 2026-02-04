package thinhph.fptu.de190006.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.de190006.entities.NewsArticle;
import thinhph.fptu.de190006.services.INewsService;

import java.util.List;

@Controller
@RequestMapping("/news")
@CrossOrigin
public class NewsController {
    private final INewsService newsService;

    @Autowired
    public NewsController(INewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public ResponseEntity<List<NewsArticle>> getAllNews() {
        return newsService.getAllNews().isEmpty() ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsArticle> getNewsById(@PathVariable Long id) {
        return newsService.getNewsById(id) == null ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(newsService.getNewsById(id));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<NewsArticle> updateNews(@PathVariable Long id, @RequestBody NewsArticle news) {
        return ResponseEntity.ok(newsService.updateNews(id, news));
    }

    @PostMapping("/create")
    public ResponseEntity<NewsArticle> createNews(@RequestBody NewsArticle news) {
        return ResponseEntity.ok(newsService.createNews(news));
    }
}
