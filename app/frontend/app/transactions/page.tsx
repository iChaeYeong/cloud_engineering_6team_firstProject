"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TransactionStatus = "입금" | "출금";

type Transaction = {
  id: number;
  time: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  status: TransactionStatus;
};

const transactions: Transaction[] = [
  { id: 1, time: "2026-06-26 09:30", fromAccount: "100-200-300001", toAccount: "200-111-900001", amount: 50000, status: "출금" },
  { id: 2, time: "2026-06-26 10:15", fromAccount: "300-555-100001", toAccount: "100-200-300001", amount: 120000, status: "입금" },
  { id: 3, time: "2026-06-26 11:40", fromAccount: "100-200-300002", toAccount: "400-222-700001", amount: 30000, status: "출금" },
  { id: 4, time: "2026-06-26 13:05", fromAccount: "500-888-100001", toAccount: "100-200-300002", amount: 75000, status: "입금" }
];

export default function TransactionsPage() {
  const [statusFilter, setStatusFilter] = useState<"전체" | TransactionStatus>("전체");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => statusFilter === "전체" || transaction.status === statusFilter)
      .sort((a, b) => {
        const left = new Date(a.time).getTime();
        const right = new Date(b.time).getTime();
        return sortOrder === "desc" ? right - left : left - right;
      });
  }, [statusFilter, sortOrder]);

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
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.time}</td>
                  <td>{transaction.fromAccount}</td>
                  <td>{transaction.toAccount}</td>
                  <td>{transaction.amount.toLocaleString()}원</td>
                  <td>
                    <span className={transaction.status === "입금" ? "statusBadge deposit" : "statusBadge withdraw"}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
