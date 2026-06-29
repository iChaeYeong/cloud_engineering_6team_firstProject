package com.exam.controller;

import com.exam.dto.AccountDTO;
import com.exam.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // 사용자의 계좌 목록 조회 (입출금 화면)
    @GetMapping
    public List<AccountDTO> accountsByUserId(@RequestParam String userId) {
        return accountService.findByUserId(userId);
    }

    // 계좌 상세 조회
    @GetMapping("/accounts")
    public AccountDTO accountDetail(@PathVariable String accountNo) {
        return accountService.findByAccountNo(accountNo);
    }
}
