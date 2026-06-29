"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAccounts } from "@/lib/api/accounts";
import { transfer } from "@/lib/api/transfer";
import type { AccountDTO } from "@/lib/data/types";

function TransferContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFrom = searchParams.get("from") ?? "";

  const [accounts, setAccounts] = useState<AccountDTO[]>([]);
  const [frmAccountNo, setFrmAccountNo] = useState(initialFrom);
  const [toAccountNo, setToAccountNo] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAccounts()
      .then((data) => {
        setAccounts(data);
        if (!initialFrom && data.length > 0) setFrmAccountNo(data[0].accountNo);
      })
      .catch(() => {});
  }, [initialFrom]);

  const handleTransfer = async () => {
    if (!frmAccountNo || !toAccountNo || !amount) {
      setErrorMessage("모든 항목을 입력하세요.");
      return;
    }
    const amountNum = parseInt(amount, 10);
    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMessage("유효한 금액을 입력하세요.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await transfer(frmAccountNo, toAccountNo, amountNum);
      if (data.success) {
        router.push("/accounts");
      } else {
        setErrorMessage(data.message ?? "이체에 실패했습니다.");
      }
    } catch {
      setErrorMessage("서버에 연결할 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page narrow">
      <nav className="nav">
        <strong>계좌이체</strong>
        <div>
          <Link href="/accounts">계좌</Link>
          <Link href="/transactions">거래내역</Link>
        </div>
      </nav>

      <section className="card">
        <p className="eyebrow">Transfer</p>
        <h1>계좌 이체</h1>
        <p className="muted">출금 계좌와 입금 계좌, 이체 금액을 입력합니다.</p>

        <label>
          출금 계좌
          <select value={frmAccountNo} onChange={(e) => setFrmAccountNo(e.target.value)}>
            {accounts.map((a) => (
              <option key={a.accountNo} value={a.accountNo}>
                {a.accountNo} / {a.accountNm} (잔액: {a.balance.toLocaleString()}원)
              </option>
            ))}
          </select>
        </label>

        <label>
          입금 계좌
          <input
            placeholder="입금 계좌번호 입력"
            value={toAccountNo}
            onChange={(e) => setToAccountNo(e.target.value)}
          />
        </label>

        <label>
          이체 금액
          <input
            type="number"
            placeholder="금액 입력"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        {errorMessage && <p className="errorText">{errorMessage}</p>}

        <div className="buttonRow">
          <button className="primaryButton" onClick={handleTransfer} disabled={isLoading}>
            {isLoading ? "처리 중..." : "이체하기"}
          </button>
          <Link className="secondaryButton" href="/accounts">
            취소
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function TransferPage() {
  return (
    <Suspense fallback={<p className="muted" style={{ padding: "2rem" }}>로딩 중...</p>}>
      <TransferContent />
    </Suspense>
  );
}
