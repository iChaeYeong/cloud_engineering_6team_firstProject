package com.exam.service;

import com.exam.dto.UserDTO;
import com.exam.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserMapper userMapper,
            PasswordEncoder passwordEncoder
    ) {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO login(String userId, String pwd) {

        // 아이디로 DB 사용자 조회
        UserDTO user = userMapper.findById(userId);

        // 사용자가 없으면 로그인 실패
        if (user == null) {
            return null;
        }

        // 입력한 평문 비밀번호와 DB에 저장된 암호화 비밀번호 비교
        if (!passwordEncoder.matches(pwd, user.getPwd())) {
            return null;
        }

       
        user.setPwd(null);

        return user;
    }

    @Override
    @Transactional
    public int register(UserDTO userDTO) {

        // 사용자가 입력한 비밀번호 암호화
        String encodedPassword =
                passwordEncoder.encode(userDTO.getPwd());

        // 암호화한 값을 DTO에 다시 저장
        userDTO.setPwd(encodedPassword);

        // 암호화된 비밀번호를 DB에 INSERT
        return userMapper.save(userDTO);
    }
}