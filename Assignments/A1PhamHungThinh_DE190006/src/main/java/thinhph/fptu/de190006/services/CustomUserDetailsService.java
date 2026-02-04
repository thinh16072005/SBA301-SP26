package thinhph.fptu.de190006.services;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import thinhph.fptu.de190006.entities.Account;
import thinhph.fptu.de190006.repositories.AccountRepository;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    public CustomUserDetailsService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByAccountEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found"));
        String roleName = (account.getAccountRole() != null && account.getAccountRole() == 1)
                ? "ROLE_ADMIN" : "ROLE_USER";
        return new User(account.getAccountEmail(), account.getAccountPassword(),
                List.of(new SimpleGrantedAuthority(roleName)));
    }
}
