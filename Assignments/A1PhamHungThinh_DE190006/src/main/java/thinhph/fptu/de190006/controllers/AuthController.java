package thinhph.fptu.de190006.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.de190006.dto.LoginRequest;
import thinhph.fptu.de190006.dto.LoginResponse;
import thinhph.fptu.de190006.entities.Account;
import thinhph.fptu.de190006.repositories.AccountRepository;
import thinhph.fptu.de190006.services.JwtService;
import thinhph.fptu.de190006.services.AccountService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AccountRepository accountRepository;
    private final JwtService jwtService;
    private final AccountService accountService;

    public AuthController(AuthenticationManager authenticationManager,
                          AccountRepository accountRepository,
                          JwtService jwtService,
                          AccountService accountService) {
        this.authenticationManager = authenticationManager;
        this.accountRepository = accountRepository;
        this.jwtService = jwtService;
        this.accountService = accountService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            if (authentication.isAuthenticated()) {
                Account account = accountRepository.findByAccountEmail(request.getEmail())
                        .orElseThrow();
                String token = jwtService.generateToken(account);
                return ResponseEntity.ok(new LoginResponse(
                        token,
                        account.getAccountId(),
                        account.getAccountName(),
                        account.getAccountRole(),
                        account.getAccountEmail()
                ));
            }
            return ResponseEntity.status(401).build();
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Account> register(@RequestBody Account account) {
        return ResponseEntity.ok(accountService.createAccount(account));
    }
}
