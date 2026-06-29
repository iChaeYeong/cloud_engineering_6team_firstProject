"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TransactionStatus = "입금" | "출금";

type ApiTransaction = {
  tranId: number;
  frmAccountNo: string;
  toAccountNo: string;
  tranAmt: number;
  tranDt: string;
};

export default function TransactionsPage() {
  const [accountNo, setAccountNo] = useState("110-1234-4444");
  const [transactions, setTransactions] = useState<ApiTransaction[]>([]);
  const [statusFilter, setStatusFilter] = useState<"전체" | TransactionStatus>("전체");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchTransactions = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(`http://localhost:8080/transactions/${accountNo}`);

      if (!response.ok) {
        throw new Error("거래내역 조회에 실패했습니다.");
      }

      const data: ApiTransaction[] = await response.json();
      setTransactions(data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const status: TransactionStatus = transaction.frmAccountNo === accountNo ? "출금" : "입금";
        return statusFilter === "전체" || status === statusFilter;
      })
      .sort((a, b) => {
        const left = new Date(a.tranDt).getTime();
        const right = new Date(b.tranDt).getTime();
        return sortOrder === "desc" ? right - left : left - right;
      });
  }, [transactions, statusFilter, sortOrder, accountNo]);

  return (
    <main className="page">
      <nav className="nav">
        <strong>거래 내역조회</strong>
        <div>
          <Link href="/accounts">계좌</Link>
          <Link href="/transfer">이체</Link>
        </div>
      </nav>

      <section className="card">
        <div className="tableHeader">
          <div>
            <p className="eyebrow">Transactions</p>
            <h1>거래 내역조회</h1>
            <p className="muted">입금/출금 상태별 필터와 시간 정렬을 제공합니다.</p>
          </div>
          <div className="filterBox">
            <input
              value={accountNo}
              onChange={(event) => setAccountNo(event.target.value)}
              placeholder="계좌번호"
            />
            <button type="button" onClick={fetchTransactions}>
              조회
            </button>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "전체" | TransactionStatus)}>
              <option value="전체">전체</option>
              <option value="입금">입금</option>
              <option value="출금">출금</option>
            </select>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as "desc" | "asc")}>
              <option value="desc">시간 내림차순</option>
              <option value="asc">시간 오름차순</option>
            </select>
          </div>
        </div>

        {isLoading && <p className="muted">거래내역을 불러오는 중입니다...</p>}
        {errorMessage && <p className="errorText">{errorMessage}</p>}

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>시간</th>
                <th>출금 계좌</th>
                <th>입금 계좌</th>
                <th>금액</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => {
                const status: TransactionStatus = transaction.frmAccountNo === accountNo ? "출금" : "입금";

                return (
                  <tr key={transaction.tranId}>
                    <td>{transaction.tranDt}</td>
                    <td>{transaction.frmAccountNo}</td>
                    <td>{transaction.toAccountNo}</td>
                    <td>{transaction.tranAmt.toLocaleString()}원</td>
                    <td>
                      <span className={status === "입금" ? "statusBadge deposit" : "statusBadge withdraw"}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
