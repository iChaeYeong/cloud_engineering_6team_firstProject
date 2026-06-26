import Link from "next/link";

export default function TransferPage() {
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
          <select defaultValue="100-200-300001">
            <option value="100-200-300001">100-200-300001 / 입출금 통장</option>
            <option value="100-200-300002">100-200-300002 / 생활비 통장</option>
          </select>
        </label>

        <label>
          입금 계좌
          <input placeholder="입금 계좌번호 입력" />
        </label>

        <label>
          이체 금액
          <input type="number" placeholder="금액 입력" />
        </label>

        <label>
          메모
          <input placeholder="선택 입력" />
        </label>

        <div className="buttonRow">
          <Link className="primaryButton" href="/transactions">
            이체하기
          </Link>
          <Link className="secondaryButton" href="/accounts">
            취소
          </Link>
        </div>
      </section>
    </main>
  );
}
