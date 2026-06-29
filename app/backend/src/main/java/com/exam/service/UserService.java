package com.exam.service;

import com.exam.dto.UserDTO;

public interface UserService {
    UserDTO login(String userId, String pwd);
    int register(UserDTO userDTO);
}
