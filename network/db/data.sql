USE findb;

-- 테스트용

INSERT INTO user_info VALUES ('test1', '사용자1', '1234');
INSERT INTO user_info VALUES ('test2', '사용자2', '1234');

INSERT INTO accounts_info VALUES ('110-1234-4444', 'test1', 10000000, '테스트적금계좌1', '정상');
INSERT INTO accounts_info VALUES ('110-1233-3333', 'test1', 450000, '테스트주식계좌1', '정상');
INSERT INTO accounts_info VALUES ('110-1222-2222', 'test2', 9200000, '테스트적금계좌2', '정상');
INSERT INTO accounts_info VALUES ('110-1211-1111', 'test2', 400000, '테스트주식계좌2', '정상');

INSERT INTO transaction_history VALUES (NULL, '110-1234-4444', '110-1233-3333', 100000, NOW());
INSERT INTO transaction_history VALUES (NULL, '110-1234-4444', '110-1222-2222', 300000, NOW());
