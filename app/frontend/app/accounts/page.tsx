import Link from "next/link";

const accounts = [
  {
    accountNumber: "100-200-300001",
    alias: "입출금 통장",
    balance: 1250000,
    status: "정상"
  },
  {
    accountNumber: "100-200-300002",
    alias: "생활비 통장",
    balance: 430000,
    status: "정상"
  }
];

export default function AccountsPage() {
  return (
    <main className="page">
      <nav className="nav">
        <strong>계좌이체 시스템</strong>
        <div>
          <Link href="/accounts">계좌</Link>
          <Link href="/transfer">이체</Link>
          <Link href="/transactions">거래내역</Link>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">Main</p>
        <h1>계좌 상세 페이지</h1>
        <p className="muted">내 계좌번호, 별칭, 잔액, 상태를 확인하고 바로 이체/내역조회가 가능합니다.</p>
      </section>

      <section className="accountGrid">
        {accounts.map((account) => (
          <article className="card" key={account.accountNumber}>
            <div className="cardHeader">
              <div>
                <p className="muted">계좌별칭</p>
                <h2>{account.alias}</h2>
              </div>
              <span className="statusBadge">{account.status}</span>
            </div>
            <dl className="infoList">
              <div>
                <dt>계좌번호</dt>
                <dd>{account.accountNumber}</dd>
              </div>
              <div>
                <dt>잔액</dt>
                <dd>{account.balance.toLocaleString()}원</dd>
              </div>
            </dl>
            <div className="buttonRow">
              <Link className="secondaryButton" href={`/transactions?account=${account.accountNumber}`}>
                내역조회
              </Link>
              <Link className="primaryButton" href={`/transfer?from=${account.accountNumber}`}>
                이체하기
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
