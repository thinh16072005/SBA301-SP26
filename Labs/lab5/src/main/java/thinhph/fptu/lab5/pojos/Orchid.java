package thinhph.fptu.lab5.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orchid")
@Getter
@Setter
@NoArgsConstructor
public class Orchid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id", nullable = false)
    private Long orchidId;

    @Column(name = "orchid_name", nullable = false)
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "BIT DEFAULT 0")
    private Boolean isNatural;

    @Column(name = "orchid_description")
    private String orchidDescription;

    @Column(name = "is_attractive", columnDefinition = "BIT DEFAULT 0")
    private Boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidUrl;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public Orchid(String orchidName,
                  Boolean isNatural,
                  String orchidDescription,
                  Category category,
                  Boolean isAttractive,
                  String orchidUrl) {
        this.orchidName = orchidName;
        this.isNatural = isNatural;
        this.orchidDescription = orchidDescription;
        this.category = category;
        this.isAttractive = isAttractive;
        this.orchidUrl = orchidUrl;
    }
}