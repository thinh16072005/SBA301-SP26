package thinhph.fptu.de190006.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.de190006.entities.Account;
import thinhph.fptu.de190006.services.AccountService;

import java.util.List;

@Controller
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        return accountService.getAllAccounts().isEmpty() ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id) == null ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(accountService.getAccountById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestBody Account account) {
        return ResponseEntity.ok(accountService.updateAccount(id, account));
    }

    @DeleteMapping("/{id}")
    public void deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
    }
}
