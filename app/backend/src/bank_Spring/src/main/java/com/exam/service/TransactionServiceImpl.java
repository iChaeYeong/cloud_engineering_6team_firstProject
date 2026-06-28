package com.exam.service;

import com.exam.dto.AccountDTO;
import com.exam.dto.TransactionDTO;
import com.exam.mapper.AccountMapper;
import com.exam.mapper.TransactionMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    TransactionMapper transactionMapper;
    AccountMapper accountMapper;

    public TransactionServiceImpl(TransactionMapper transactionMapper, AccountMapper accountMapper) {
        this.transactionMapper = transactionMapper;
        this.accountMapper = accountMapper;
    }

    @Override
    public List<TransactionDTO> findByAccountNo(String accountNo) {
        return transactionMapper.findByAccountNo(accountNo);
    }

    @Override
    @Transactional
    public int transfer(String frmAccountNo, String toAccountNo, int amount) {
        AccountDTO fromAccount = accountMapper.findByAccountNo(frmAccountNo);
        AccountDTO toAccount   = accountMapper.findByAccountNo(toAccountNo);
        if (fromAccount == null || toAccount == null) return 0;
        if (fromAccount.getBalance() < amount) return 0;

        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);
        accountMapper.updateBalance(fromAccount);
        accountMapper.updateBalance(toAccount);

        TransactionDTO tran = new TransactionDTO();
        tran.setFrmAccountNo(frmAccountNo);
        tran.setToAccountNo(toAccountNo);
        tran.setTranAmt(amount);
        return transactionMapper.save(tran);
    }
}
