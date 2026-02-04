package thinhph.fptu.de190006.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "category")
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Long categoryId;

    @Column(name = "category_name", nullable = false, unique = true)
    private String categoryName;

    @Column(name = "category_description", nullable = false)
    private String categoryDescription;

    @Column(name = "is_active", nullable = false, columnDefinition = "BIT DEFAULT 0")
    private Boolean isActive;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    public Category(String categoryName, String categoryDescription, Boolean isActive) {
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
        this.isActive = isActive;
    }

}