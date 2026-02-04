package thinhph.fptu.de190006.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "news_article")
@NoArgsConstructor
public class NewsArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id", nullable = false)
    private Long newsId;

    @Column(name = "news_title", nullable = false)
    private String newsTitle;

    @Column(name = "headline", nullable = false)
    private String headline;

    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate;

    @Column(name = "news_content", nullable = false, columnDefinition = "TEXT")
    private String newsContent;

    @Column(name = "news_source", nullable = false)
    private String newsSource;

    @Column(name = "news_status", nullable = false, columnDefinition = "BIT DEFAULT 0")
    private Boolean newsStatus;

    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private Account authorCreate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_id")
    private Account authorUpdate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "news_tag", joinColumns = @JoinColumn(name = "news_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdDate = now;
        this.modifiedDate = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifiedDate = LocalDateTime.now();
    }


    public NewsArticle(String newsTitle, String headline, String newsContent, String newsSource, Category category) {
        this.newsTitle = newsTitle;
        this.headline = headline;
        this.newsContent = newsContent;
        this.newsSource = newsSource;
        this.category = category;
    }
}