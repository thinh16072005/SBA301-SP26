package thinhph.fptu.de190006.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", nullable = false)
    private Long tagId;

    @Column(name = "tag_name", nullable = false, unique = true)
    private String tagName;

    @Column(name = "note", nullable = false)
    private String note;
}