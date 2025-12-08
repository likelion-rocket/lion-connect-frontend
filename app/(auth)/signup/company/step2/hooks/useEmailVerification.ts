import { useState, useCallback, useEffect } from "react";
import {
  sendCompanyEmailVerificationAPI,
  checkCompanyEmailVerificationAPI,
} from "@/lib/api/auth";
import { ApiError } from "@/lib/apiClient";

interface UseEmailVerificationReturn {
  email: string;
  verificationCode: string;
  verificationToken: string;
  isEmailSent: boolean;
  isVerified: boolean;
  isSending: boolean;
  isVerifying: boolean;
  remainingTime: number;
  buttonText: string;
  error: string | null;
  setEmail: (email: string) => void;
  setVerificationCode: (code: string) => void;
  sendVerificationEmail: () => Promise<void>;
  verifyCode: () => Promise<void>;
  canSendEmail: boolean;
  canVerify: boolean;
}

export function useEmailVerification(): UseEmailVerificationReturn {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // 이메일 전송 가능 여부 (이메일이 입력되고 && 타이머가 만료됨 && 전송 중이 아님)
  const canSendEmail = email.length > 0 && remainingTime === 0 && !isSending;

  // 인증 코드 확인 가능 여부 (인증 코드가 입력되고 && 아직 인증되지 않음 && 확인 중이 아님)
  const canVerify = verificationCode.length > 0 && !isVerified && !isVerifying;

  // 버튼 텍스트 결정
  const buttonText = isEmailSent ? "다시 인증 받기" : "메일 인증 받기";

  // 타이머 로직
  useEffect(() => {
    if (remainingTime <= 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  // 인증 메일 전송
  const sendVerificationEmail = useCallback(async () => {
    if (!canSendEmail) return;

    setIsSending(true);
    setError(null);

    try {
      await sendCompanyEmailVerificationAPI(email);

      setIsEmailSent(true);
      setRemainingTime(30); // 30초 쿨다운
      setVerificationCode(""); // 인증 코드 초기화
      console.log("인증 메일 전송 성공:", email);
    } catch (err) {
      console.error("인증 메일 전송 실패:", err);

      if (err instanceof ApiError) {
        setError(err.message || "인증 메일 전송에 실패했습니다.");
      } else {
        setError("인증 메일 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsSending(false);
    }
  }, [email, canSendEmail]);

  // 인증 코드 확인
  const verifyCode = useCallback(async () => {
    if (!canVerify) return;

    setIsVerifying(true);
    setError(null);

    try {
      const result = await checkCompanyEmailVerificationAPI(email, verificationCode);

      if (result.valid) {
        setIsVerified(true);
        setVerificationToken(verificationCode); // 인증 성공 시 토큰 저장
        console.log("이메일 인증 완료");
      } else {
        setError("인증 코드가 올바르지 않습니다. 다시 확인해주세요.");
      }
    } catch (err) {
      console.error("인증 코드 확인 실패:", err);

      if (err instanceof ApiError) {
        setError(err.message || "인증 코드 확인에 실패했습니다.");
      } else {
        setError("인증 코드 확인에 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsVerifying(false);
    }
  }, [email, verificationCode, canVerify]);

  return {
    email,
    verificationCode,
    verificationToken,
    isEmailSent,
    isVerified,
    isSending,
    isVerifying,
    remainingTime,
    buttonText,
    error,
    setEmail,
    setVerificationCode,
    sendVerificationEmail,
    verifyCode,
    canSendEmail,
    canVerify,
  };
}
