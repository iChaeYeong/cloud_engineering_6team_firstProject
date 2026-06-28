package com.exam.mapper;

import com.exam.dto.AccountDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AccountMapper {
    List<AccountDTO> findByUserId(String userId);
    AccountDTO findByAccountNo(String accountNo);
    int updateBalance(AccountDTO accountDTO);
}
