package com.exam;

import com.exam.dto.TodoDTO;
import com.exam.service.TodoMyBatisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("----------------------------------------------------------");
        System.out.println("Start With sample13_REST4_Exception_LEE");
        System.out.println("----------------------------------------------------------");
    }
}
