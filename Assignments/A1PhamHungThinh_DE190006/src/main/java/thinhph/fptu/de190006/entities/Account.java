package thinhph.fptu.de190006.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "system_account")
@NoArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "account_name", nullable = false)
    private String accountName;

    @Column(name = "account_email", nullable = false, unique = true)
    private String accountEmail;

    @Column(name = "account_role", nullable = false)
    private Integer accountRole;

    @Column(name = "account_password", nullable = false)
    private String accountPassword;

    public Account(String accountName,
                   String accountEmail,
                   Integer accountRole,
                   String accountPassword) {
        this.accountName = accountName;
        this.accountEmail = accountEmail;
        this.accountRole = accountRole;
        this.accountPassword = accountPassword;
    }

}