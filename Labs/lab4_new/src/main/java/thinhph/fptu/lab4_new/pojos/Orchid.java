package thinhph.fptu.lab4_new.pojos;

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
    @Column(name = "orchid_id")
    private Long orchidId;

    @Column(name = "orchid_name")
    private String orchidName;

    @Column(name = "is_natural", columnDefinition = "BIT DEFAULT 0")
    private boolean is_natural;

    @Column(name = "orchid_description")
    private String orchidDescription;

    @Column(name = "orchid_category")
    private String orchidCategory;

    @Column(name = "is_attractive", columnDefinition = "BIT DEFAULT 0")
    private boolean isAttractive;

    @Column(name = "orchid_url")
    private String orchidUrl;

    public Orchid(String orchidName, boolean is_natural, String orchidDescription, String orchidCategory, boolean isAttractive, String orchidUrl) {
        this.orchidName = orchidName;
        this.is_natural = is_natural;
        this.orchidDescription = orchidDescription;
        this.orchidCategory = orchidCategory;
        this.isAttractive = isAttractive;
        this.orchidUrl = orchidUrl;
    }
}