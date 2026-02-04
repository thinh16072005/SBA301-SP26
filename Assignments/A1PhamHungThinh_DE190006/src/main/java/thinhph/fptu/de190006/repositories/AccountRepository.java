package thinhph.fptu.de190006.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import thinhph.fptu.de190006.entities.Account;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountEmail(String accountEmail);
}
