package com.exam.service;

import com.exam.mapper.TodoMapper;
import com.exam.dto.TodoDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("todoMyBatisService") // "todoMyBatisService" 필요없음.
public class TodoMyBatisServiceImpl implements TodoMyBatisService {

    TodoMapper todoMapper;
    public TodoMyBatisServiceImpl(TodoMapper todoMapper) {
        this.todoMapper = todoMapper;
    }

    @Override
    public List<TodoDTO> findAll() {
        return todoMapper.findAll();
    }

    @Override
    public TodoDTO findById(int id) {
        return todoMapper.findById(id);
    }

    @Override
    @Transactional
    public int save(TodoDTO todoDTO) {
        return todoMapper.save(todoDTO);
    }

    @Override
    @Transactional
    public int updateById(TodoDTO todoDTO) {
        return todoMapper.updateById(todoDTO);
    }

    @Override
    @Transactional
    public int deleteById(int id) {
        return todoMapper.deleteById(id);
    }
}
