package com.exam.mapper;

import com.exam.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    UserDTO findById(String userId);
    int save(UserDTO userDTO);
}
