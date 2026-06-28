package com.exam.service;

import com.exam.dto.TodoDTO;

import java.util.List;

public interface TodoMyBatisService {
    List<TodoDTO> findAll();
    TodoDTO findById(int id);
    int save(TodoDTO todoDTO);
    int updateById(TodoDTO todoDTO);
    int  deleteById(int id);
}
