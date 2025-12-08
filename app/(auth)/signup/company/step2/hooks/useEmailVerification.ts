import { useState, useCallback, useEffect } from "react";

interface UseEmailVerificationReturn {
  email: string;
  verificationCode: string;
  isEmailSent: boolean;
  isVerified: boolean;
  remainingTime: number;
  buttonText: string;
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
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // 이메일 전송 가능 여부 (이메일이 입력되고 && 타이머가 만료됨)
  const canSendEmail = email.length > 0 && remainingTime === 0;

  // 인증 코드 확인 가능 여부 (인증 코드가 입력되고 && 아직 인증되지 않음)
  const canVerify = verificationCode.length > 0 && !isVerified;

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

    try {
      // TODO: API 호출로 인증 메일 전송
      console.log("인증 메일 전송:", email);
      // await sendEmailVerificationAPI(email);

      setIsEmailSent(true);
      setRemainingTime(30); // 30초 쿨다운
      setVerificationCode(""); // 인증 코드 초기화
    } catch (error) {
      console.error("인증 메일 전송 실패:", error);
      // TODO: 에러 처리
    }
  }, [email, canSendEmail]);

  // 인증 코드 확인
  const verifyCode = useCallback(async () => {
    if (!canVerify) return;

    try {
      // TODO: API 호출로 인증 코드 확인
      console.log("인증 코드 확인:", { email, code: verificationCode });
      // const result = await verifyEmailCodeAPI(email, verificationCode);

      // 임시: 항상 성공으로 가정
      setIsVerified(true);
      console.log("이메일 인증 완료");
    } catch (error) {
      console.error("인증 코드 확인 실패:", error);
      // TODO: 에러 처리
    }
  }, [email, verificationCode, canVerify]);

  return {
    email,
    verificationCode,
    isEmailSent,
    isVerified,
    remainingTime,
    buttonText,
    setEmail,
    setVerificationCode,
    sendVerificationEmail,
    verifyCode,
    canSendEmail,
    canVerify,
  };
}
