package com.exam.controller;

import com.exam.dto.UserDTO;
import com.exam.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UserController {

    UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 로그인
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody UserDTO userDTO) {
        Map<String, Object> result = new HashMap<>();
        UserDTO user = userService.login(userDTO.getUserId(), userDTO.getPwd());
        if (user == null) {
            result.put("success", false);
            result.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
        } else {
            result.put("success", true);
            result.put("user", user);
        }
        return result;
    }

    // 회원가입
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody UserDTO userDTO) {
        Map<String, Object> result = new HashMap<>();
        int n = userService.register(userDTO);
        if (n > 0) {
            result.put("success", true);
            result.put("message", "회원가입이 완료되었습니다.");
        } else {
            result.put("success", false);
            result.put("message", "회원가입에 실패했습니다.");
        }
        return result;
    }
}
