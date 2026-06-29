"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/auth";

export default function SignupPage() {
  const router = useRouter();
  const [userNm, setUserNm] = useState("");
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!userNm || !userId || !pwd || !pwdConfirm) {
      setErrorMessage("모든 항목을 입력하세요.");
      return;
    }
    if (pwd !== pwdConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await register(userId, pwd, userNm);
      if (data.success) {
        router.push("/login");
      } else {
        setErrorMessage(data.message ?? "회원가입에 실패했습니다.");
      }
    } catch {
      setErrorMessage("서버에 연결할 수 없습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="authPage">
      <section className="authCard">
        <p className="eyebrow">Create Account</p>
        <h1>회원가입</h1>
        <p className="muted">테스트용 사용자 계정을 생성합니다.</p>

        <label>
          이름
          <input
            placeholder="이름"
            value={userNm}
            onChange={(e) => setUserNm(e.target.value)}
          />
        </label>

        <label>
          아이디
          <input
            placeholder="사용할 아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>

        <label>
          비밀번호
          <input
            type="password"
            placeholder="비밀번호"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </label>

        <label>
          비밀번호 확인
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={pwdConfirm}
            onChange={(e) => setPwdConfirm(e.target.value)}
          />
        </label>

        {errorMessage && <p className="errorText">{errorMessage}</p>}

        <button className="primaryButton" onClick={handleRegister} disabled={isLoading}>
          {isLoading ? "처리 중..." : "가입하기"}
        </button>

        <p className="helperText">
          이미 계정이 있나요? <Link href="/login">로그인</Link>
        </p>
      </section>
    </main>
  );
}
