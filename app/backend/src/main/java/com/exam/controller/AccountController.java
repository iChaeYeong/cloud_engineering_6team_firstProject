package com.exam.controller;

import com.exam.dto.AccountDTO;
import com.exam.dto.UserDTO;
import com.exam.service.AccountService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // 사용자의 계좌 목록 조회 (세션에서 userId 추출)
    @GetMapping
    public List<AccountDTO> accountsByUserId(HttpSession session) {
        UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
        if (loginUser == null) {
            throw new RuntimeException("로그인이 필요합니다.");
        }
        return accountService.findByUserId(loginUser.getUserId());
    }
}
