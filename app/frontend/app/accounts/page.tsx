"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAccounts } from "@/lib/api/accounts";
import { logout } from "@/lib/api/auth";
import type { AccountDTO } from "@/lib/data/types";

export default function AccountsPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAccounts()
      .then(setAccounts)
      .catch(() => router.push("/login"))
      .finally(() => setIsLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <main className="page">
      <nav className="nav">
        <strong>계좌이체 시스템</strong>
        <div>
          <Link href="/accounts">계좌</Link>
          <Link href="/transfer">이체</Link>
          <Link href="/transactions">거래내역</Link>
          <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer" }}>
            로그아웃
          </button>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">Main</p>
        <h1>계좌 상세 페이지</h1>
        <p className="muted">내 계좌번호, 별칭, 잔액, 상태를 확인하고 바로 이체/내역조회가 가능합니다.</p>
      </section>

      {isLoading && <p className="muted" style={{ padding: "2rem" }}>계좌 정보를 불러오는 중입니다...</p>}
      {errorMessage && <p className="errorText" style={{ padding: "2rem" }}>{errorMessage}</p>}

      <section className="accountGrid">
        {accounts.map((account) => (
          <article className="card" key={account.accountNo}>
            <div className="cardHeader">
              <div>
                <p className="muted">계좌별칭</p>
                <h2>{account.accountNm}</h2>
              </div>
              <span className="statusBadge">{account.accountStat}</span>
            </div>
            <dl className="infoList">
              <div>
                <dt>계좌번호</dt>
                <dd>{account.accountNo}</dd>
              </div>
              <div>
                <dt>잔액</dt>
                <dd>{account.balance.toLocaleString()}원</dd>
              </div>
            </dl>
            <div className="buttonRow">
              <Link className="secondaryButton" href={`/transactions?account=${account.accountNo}`}>
                내역조회
              </Link>
              <Link className="primaryButton" href={`/transfer?from=${account.accountNo}`}>
                이체하기
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
