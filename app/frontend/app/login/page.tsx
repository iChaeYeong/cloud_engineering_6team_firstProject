"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!userId || !pwd) {
      setErrorMessage("아이디와 비밀번호를 입력하세요.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await login(userId, pwd);
      if (data.success) {
        router.push("/accounts");
      } else {
        setErrorMessage(data.message ?? "로그인에 실패했습니다.");
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
        <p className="eyebrow">Banking Service</p>
        <h1>로그인</h1>
        <p className="muted">계좌이체 시스템에 접속합니다.</p>

        <label>
          아이디
          <input
            placeholder="아이디를 입력하세요"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>

        <label>
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </label>

        {errorMessage && <p className="errorText">{errorMessage}</p>}

        <button className="primaryButton" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        <p className="helperText">
          계정이 없나요? <Link href="/signup">회원가입</Link>
        </p>
      </section>
    </main>
  );
}
