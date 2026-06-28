package com.exam.service;

import com.exam.dto.UserDTO;
import com.exam.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    UserMapper userMapper;

    public UserServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public UserDTO login(String userId, String pwd) {
        UserDTO user = userMapper.findById(userId);
        if (user == null || !user.getPwd().equals(pwd)) {
            return null;
        }
        user.setPwd(null);
        return user;
    }

    @Override
    @Transactional
    public int register(UserDTO userDTO) {
        return userMapper.save(userDTO);
    }
}
