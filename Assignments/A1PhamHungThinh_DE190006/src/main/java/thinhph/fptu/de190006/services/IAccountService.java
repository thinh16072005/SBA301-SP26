package thinhph.fptu.de190006.services;

import thinhph.fptu.de190006.entities.Account;

import java.util.List;

public interface IAccountService {
    Account createAccount(Account account);
    Account updateAccount(Long id, Account account);
    void deleteAccount(Long id);
    Account getAccountById(Long id);
    List<Account> getAllAccounts();
    Account getAccountByEmail(String email);
}
