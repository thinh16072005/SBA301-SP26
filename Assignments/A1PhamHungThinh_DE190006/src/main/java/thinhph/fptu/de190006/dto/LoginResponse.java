package thinhph.fptu.de190006.dto;

import lombok.Getter;

@Getter
public class LoginResponse {
    private String token;
    private Long accountId;
    private String accountName;
    private Integer accountRole;
    private String accountEmail;

    public LoginResponse(String token,
                         Long accountId,
                         String accountName,
                         Integer accountRole,
                         String accountEmail) {
        this.token = token;
        this.accountId = accountId;
        this.accountName = accountName;
        this.accountRole = accountRole;
        this.accountEmail = accountEmail;
    }

}
