// app/(base)/talents/register/page.tsx
"use client";

import Image from "next/image";

import IntroComponent from "./_components/IntroComponent";
import CodeRegisterComponent from "./_components/CodeRegisterComponent";
import ProfileComponent from "./_components/ProfileComponent";
import PortfolioComponent from "./_components/PortfolioComponent";
import LinkRegisterComponent from "./_components/LinkComponent";
import EducationComponent from "./_components/EducationComponent";
import CareerComponent from "./_components/CareerComponent";
import SkillComponent from "./_components/SkillComponent";
import QualificationComponent from "./_components/QualificationComponent";
import TendencyComponent from "./_components/TendencyComponent";
import PhotoComponent from "./_components/PhotoComponent";

import { useRegisterTalentPage } from "@/hooks/useRegisterTalentPage";

export default function RegisterTalent() {
  const {
    pending,
    isComplete,
    handleSubmitAll,
    handleGoBack,

    // 상단
    name,
    setNameSafe,
    intro,
    setIntroSafe,
    portfolioFile,
    setPortfolioFileSafe,
    likelionCode,
    setLikelionCodeSafe,

    // ✅ 스킬
    skillIds,
    setSkillIds,

    jobGroup,
    setJobGroup,
    job,
    setJob,

    setTendencyIds,
    initialTendencyIds,

    setExpTagIds,
    initialExpTagIds,

    // 학력
    edu,
    currentEduId,
    handleEducationDeleted,

    // 경력
    career,
    handleDeleteExperience,

    // 어학/자격증
    lang,
    handleDeleteLanguage,
    cert,
    handleDeleteCertification,

    // ✅ 수상
    award,
    handleDeleteAward,
  } = useRegisterTalentPage();

  return (
    <div className="w-full text-black mt-8">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1 hover:opacity-80 transition"
        >
          <Image src="/icons/outline-cheveron-left.svg" alt="back" width={24} height={24} />
          <span className="text-lg font-bold text-black">이전 페이지</span>
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-black">
          인재 등록 페이지
        </h1>

        <div className="flex items-center gap-3">
          <button
            disabled={!isComplete || pending}
            onClick={handleSubmitAll}
            className={`px-4 py-2 rounded-md text-sm font-semibold border border-border-quaternary transition
              ${
                isComplete && !pending
                  ? "bg-[#FF6000] text-white hover:opacity-90"
                  : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
              }`}
          >
            {pending ? "작성 중..." : "작성 완료"}
          </button>
        </div>
      </div>

      {/* 본문 */}
      <main className="py-8 flex flex-col gap-10 mx-40">
        <IntroComponent
          name={name}
          onNameChange={setNameSafe}
          initialExpTagIds={initialExpTagIds}
          onChangeExpTagIds={setExpTagIds}
        />
        <PhotoComponent />
        <CodeRegisterComponent code={likelionCode} onCodeChange={setLikelionCodeSafe} />
        <ProfileComponent
          intro={intro}
          onIntroChange={setIntroSafe}
          jobGroup={jobGroup}
          job={job}
          onChangeJobGroup={setJobGroup}
          onChangeJob={setJob}
        />
        <TendencyComponent initialIds={initialTendencyIds} onChangeSelectedIds={setTendencyIds} />

        <EducationComponent
          educationId={currentEduId}
          schoolName={edu.form.schoolName}
          onChangeSchoolName={edu.onChangeSchoolName}
          periodText={edu.form.periodText}
          onChangePeriodText={edu.onChangePeriodText}
          status={edu.form.status}
          onChangeStatus={edu.onChangeStatus}
          major={edu.form.major}
          onChangeMajor={edu.onChangeMajor}
          description={edu.form.description}
          onChangeDescription={edu.onChangeDescription}
          errors={edu.errors}
          onDeleted={handleEducationDeleted}
        />

        <CareerComponent
          companies={career.companies}
          errors={career.errors}
          hasAnyValue={career.hasAnyValue}
          onChange={career.onChange}
          onAdd={career.addCompany}
          onClear={career.clearCompany}
          onDelete={handleDeleteExperience}
        />

        <SkillComponent selectedSkillIds={skillIds} onChangeSelectedSkillIds={setSkillIds} />

        <QualificationComponent
          // ✅ 수상
          awards={award.awards}
          awardErrors={award.errors}
          hasAnyAwardValue={award.hasAnyValue}
          onAwardChange={award.onChange}
          onAwardAdd={award.add}
          onAwardClear={award.clear}
          onAwardDelete={handleDeleteAward}
          // 어학
          langs={lang.langs}
          langErrors={lang.errors}
          hasAnyValue={lang.hasAnyValue}
          onLangChange={lang.onChange}
          onLangAdd={lang.add}
          onLangClear={lang.clear}
          onLangDelete={handleDeleteLanguage}
          // 자격증
          certs={cert.certs}
          certErrors={cert.errors}
          hasAnyCertValue={cert.hasAnyValue}
          onCertChange={cert.onChange}
          onCertAdd={cert.add}
          onCertClear={cert.clear}
          onCertDelete={handleDeleteCertification}
        />

        <LinkRegisterComponent />
        <PortfolioComponent fileName={portfolioFile} onFileSelect={setPortfolioFileSafe} />
      </main>
    </div>
  );
}
