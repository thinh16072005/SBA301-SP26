package thinhph.fptu.lab5.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrchidUpdateDto {
    private String orchidName;
    private String orchidDescription;
    private String orchidUrl;
    private Boolean isNatural;
    private Boolean isAttractive;
    private Long categoryId;
}
