package com.exam.mapper;

import com.exam.dto.TransactionDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TransactionMapper {
    List<TransactionDTO> findByAccountNo(String accountNo);
    int save(TransactionDTO transactionDTO);
}
