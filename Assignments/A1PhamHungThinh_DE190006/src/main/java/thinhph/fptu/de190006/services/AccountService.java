package thinhph.fptu.de190006.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import thinhph.fptu.de190006.entities.Account;
import thinhph.fptu.de190006.repositories.AccountRepository;

import java.util.List;

@Service
public class AccountService implements IAccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(AccountRepository accountRepository,
                          PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Account createAccount(Account account) {
        account.setAccountPassword(passwordEncoder.encode(account.getAccountPassword()));
        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(Long id, Account account) {
        return accountRepository.findById(id)
                .map(existingAccount -> {
                    existingAccount.setAccountEmail(account.getAccountEmail());
                    existingAccount.setAccountName(account.getAccountName());
                    existingAccount.setAccountRole(account.getAccountRole());
                    existingAccount.setAccountPassword(passwordEncoder.encode(account.getAccountPassword()));
                    return accountRepository.save(existingAccount);
                })
                .orElse(null);
    }

    @Override
    public void deleteAccount(Long id) {
        accountRepository.deleteById(id);
    }

    @Override
    public Account getAccountById(Long id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountByEmail(String email) {
        return accountRepository.findByAccountEmail(email).orElse(null);
    }
}
