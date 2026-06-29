import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">Banking Service</p>
        <h1>로그인</h1>
        <p className="muted">계좌이체 시스템에 접속합니다.</p>

        <label>
          아이디
          <input placeholder="아이디를 입력하세요" />
        </label>

        <label>
          비밀번호
          <input type="password" placeholder="비밀번호를 입력하세요" />
        </label>

        <Link className="primaryButton" href="/accounts">
          로그인
        </Link>

        <p className="helperText">
          계정이 없나요? <Link href="/signup">회원가입</Link>
        </p>
      </section>
    </main>
  );
}
