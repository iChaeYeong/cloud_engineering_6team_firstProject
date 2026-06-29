import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">Create Account</p>
        <h1>회원가입</h1>
        <p className="muted">테스트용 사용자 계정을 생성합니다.</p>

        <label>
          이름
          <input placeholder="이름" />
        </label>

        <label>
          아이디
          <input placeholder="사용할 아이디" />
        </label>

        <label>
          비밀번호
          <input type="password" placeholder="비밀번호" />
        </label>

        <label>
          비밀번호 확인
          <input type="password" placeholder="비밀번호 확인" />
        </label>

        <Link className="primaryButton" href="/login">
          가입하기
        </Link>

        <p className="helperText">
          이미 계정이 있나요? <Link href="/login">로그인</Link>
        </p>
      </section>
    </main>
  );
}
