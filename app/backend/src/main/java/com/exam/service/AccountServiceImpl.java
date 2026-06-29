package com.exam.service;

import com.exam.dto.AccountDTO;
import com.exam.mapper.AccountMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    AccountMapper accountMapper;

    public AccountServiceImpl(AccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }

    @Override
    public List<AccountDTO> findByUserId(String userId) {
        return accountMapper.findByUserId(userId);
    }

    @Override
    public AccountDTO findByAccountNo(String accountNo) {
        return accountMapper.findByAccountNo(accountNo);
    }
}
