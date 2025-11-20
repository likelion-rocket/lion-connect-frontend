// hooks/useProfileBasicForm.ts
import { useState, useRef, useEffect } from "react";
import { useMyProfile } from "@/hooks/talent/queries/useMyProfile";

export function useProfileBasicForm() {
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioFile, setPortfolioFile] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [likelionCode, setLikelionCode] = useState("");

  const prefilledProfileRef = useRef(false);
  const { data: myProfile } = useMyProfile();

  // 안전한 setter (불필요한 리렌더링 방지)
  const setNameSafe = (v: string) => setName((prev) => (prev === v ? prev : v));
  const setIntroSafe = (v: string) => setIntro((prev) => (prev === v ? prev : v));
  const setPortfolioFileSafe = (v: string) => setPortfolioFile((prev) => (prev === v ? prev : v));
  const setLikelionCodeSafe = (v: string) => setLikelionCode((prev) => (prev === v ? prev : v));

  // 프로필 프리필
  useEffect(() => {
    if (!myProfile) return;
    if (prefilledProfileRef.current) return;

    if (!name.trim()) setNameSafe(myProfile.name ?? "");
    if (!intro.trim()) setIntroSafe(myProfile.introduction ?? "");
    if (!portfolioFile.trim()) setPortfolioFileSafe(myProfile.storageUrl ?? "");
    if (!likelionCode.trim()) setLikelionCodeSafe(myProfile.likelionCode ?? "");

    prefilledProfileRef.current = true;
  });

  return {
    // 상태
    name,
    intro,
    portfolioFile,
    resumeFile,
    likelionCode,
    myProfile,

    // setter
    setNameSafe,
    setIntroSafe,
    setPortfolioFileSafe,
    setResumeFile,
    setLikelionCodeSafe,
  };
}
