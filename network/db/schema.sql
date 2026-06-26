create database findb;
use findb;

CREATE TABLE users (
    user_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE accounts (
    account_id VARCHAR(30) PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL,
    balance INT DEFAULT 0,
    alias VARCHAR(30),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE trans (
    trans_id INT PRIMARY KEY AUTO_INCREMENT,
    from_account VARCHAR(30) NOT NULL,   -- 출금계좌
    to_account VARCHAR(30) NOT NULL,     -- 입금계좌
    amount INT NOT NULL,
    status VARCHAR(10) NOT NULL, -- 성공/실패
    trans_time DATETIME DEFAULT CURRENT_TIMESTAMP
);