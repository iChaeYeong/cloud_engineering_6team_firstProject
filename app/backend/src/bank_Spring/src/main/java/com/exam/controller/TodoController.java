package com.exam.controller;

import com.exam.dto.TodoDTO;
import com.exam.service.TodoMyBatisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoController {
    TodoMyBatisService service;

    public TodoController(TodoMyBatisService service) {
        this.service = service;
    }

    @GetMapping("/welcome")
    public String welcome(){
        return "welcome";
    }

    //1. todo 목록보기 (select)
    @GetMapping("/todos")
    public List<TodoDTO> todos(){return service.findAll();}

    //2. 특정 todo 보기 (select)
    @GetMapping("/todos/{id}")
    public TodoDTO todoById(@PathVariable int id){return service.findById(id);}
    //  위와 동일함
    //@GetMapping("/todos/{xxx}")
    //public TodoDTO todoById(@PathVariable("xxx") int id){return service.findById(id);}

    //3. Todo 저장
    @PostMapping("/todos")
    public TodoDTO createTodo(@RequestBody TodoDTO todoDTO){
        int n = service.save(todoDTO);

        return todoDTO;
    }

    //4. Todo 수정( 전체수정)
    @PutMapping("/todos/{id}")
    public TodoDTO updateTodo(@PathVariable int id, @RequestBody TodoDTO todoDTO){
         todoDTO.setId(id);
         service.updateById(todoDTO);

         return todoDTO;
    }

    @DeleteMapping("/todos/{id}")
    public void deleteTodo(@PathVariable int id){
        service.deleteById(id);
    }
}
