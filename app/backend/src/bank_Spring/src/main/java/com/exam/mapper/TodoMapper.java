package com.exam.mapper;

import com.exam.dto.TodoDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {
    List<TodoDTO> findAll();
    TodoDTO  findById(int id);
    int save(TodoDTO todoDTO);
    int updateById(TodoDTO todoDTO);
    int deleteById(int id);
}

