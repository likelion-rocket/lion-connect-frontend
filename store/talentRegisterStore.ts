import { create } from "zustand";
import type {
  ProfileResponse,
  EducationResponse,
  ExperienceResponse,
  LanguageResponse,
  CertificationResponse,
  AwardResponse,
  ExpTagResponse,
  JobCategoryResponse,
  ProfileLinkResponse,
} from "@/types/talent";

/**
 * Talent Register Store 상태 타입
 */
type TalentRegisterState = {
  // 각 섹션별 데이터
  profile: ProfileResponse | null;
  educations: EducationResponse[];
  experiences: ExperienceResponse[];
  languages: LanguageResponse[];
  certifications: CertificationResponse[];
  awards: AwardResponse[];
  expTags: ExpTagResponse[];
  jobCategories: JobCategoryResponse[];
  profileLinks: ProfileLinkResponse[];

  // 로딩/에러 상태
  isLoading: boolean;
  error: string | null;
};

/**
 * Talent Register Store 액션 타입
 */
type TalentRegisterActions = {
  // 프로필
  setProfile: (data: ProfileResponse | null) => void;

  // 학력
  setEducations: (data: EducationResponse[]) => void;
  addEducation: (data: EducationResponse) => void;
  updateEducation: (id: number, data: Partial<EducationResponse>) => void;
  deleteEducation: (id: number) => void;

  // 경력
  setExperiences: (data: ExperienceResponse[]) => void;
  addExperience: (data: ExperienceResponse) => void;
  updateExperience: (id: number, data: Partial<ExperienceResponse>) => void;
  deleteExperience: (id: number) => void;

  // 어학
  setLanguages: (data: LanguageResponse[]) => void;
  addLanguage: (data: LanguageResponse) => void;
  updateLanguage: (id: number, data: Partial<LanguageResponse>) => void;
  deleteLanguage: (id: number) => void;

  // 자격증
  setCertifications: (data: CertificationResponse[]) => void;
  addCertification: (data: CertificationResponse) => void;
  updateCertification: (id: number, data: Partial<CertificationResponse>) => void;
  deleteCertification: (id: number) => void;

  // 수상
  setAwards: (data: AwardResponse[]) => void;
  addAward: (data: AwardResponse) => void;
  updateAward: (id: number, data: Partial<AwardResponse>) => void;
  deleteAward: (id: number) => void;

  // 경험 태그
  setExpTags: (data: ExpTagResponse[]) => void;

  // 직무 카테고리
  setJobCategories: (data: JobCategoryResponse[]) => void;

  // 프로필 링크
  setProfileLinks: (data: ProfileLinkResponse[]) => void;

  // 로딩/에러 상태
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 전체 초기화
  reset: () => void;
};

const initialState: TalentRegisterState = {
  profile: null,
  educations: [],
  experiences: [],
  languages: [],
  certifications: [],
  awards: [],
  expTags: [],
  jobCategories: [],
  profileLinks: [],
  isLoading: false,
  error: null,
};

/**
 * Talent Register Store
 *
 * 인재 등록 페이지에서 사용하는 전역 상태 관리
 * - 페이지 진입 시 모든 섹션 데이터 조회
 * - 각 섹션에서 필요한 데이터만 선택적으로 구독
 * - 임시 저장 및 최종 저장 기능 지원
 */
export const useTalentRegisterStore = create<TalentRegisterState & TalentRegisterActions>()(
  (set) => ({
    ...initialState,

    // 프로필
    setProfile: (data) => set({ profile: data }),

    // 학력
    setEducations: (data) => set({ educations: data }),
    addEducation: (data) =>
      set((state) => ({
        educations: [...state.educations, data],
      })),
    updateEducation: (id, data) =>
      set((state) => ({
        educations: state.educations.map((edu) => (edu.id === id ? { ...edu, ...data } : edu)),
      })),
    deleteEducation: (id) =>
      set((state) => ({
        educations: state.educations.filter((edu) => edu.id !== id),
      })),

    // 경력
    setExperiences: (data) => set({ experiences: data }),
    addExperience: (data) =>
      set((state) => ({
        experiences: [...state.experiences, data],
      })),
    updateExperience: (id, data) =>
      set((state) => ({
        experiences: state.experiences.map((exp) => (exp.id === id ? { ...exp, ...data } : exp)),
      })),
    deleteExperience: (id) =>
      set((state) => ({
        experiences: state.experiences.filter((exp) => exp.id !== id),
      })),

    // 어학
    setLanguages: (data) => set({ languages: data }),
    addLanguage: (data) =>
      set((state) => ({
        languages: [...state.languages, data],
      })),
    updateLanguage: (id, data) =>
      set((state) => ({
        languages: state.languages.map((lang) => (lang.id === id ? { ...lang, ...data } : lang)),
      })),
    deleteLanguage: (id) =>
      set((state) => ({
        languages: state.languages.filter((lang) => lang.id !== id),
      })),

    // 자격증
    setCertifications: (data) => set({ certifications: data }),
    addCertification: (data) =>
      set((state) => ({
        certifications: [...state.certifications, data],
      })),
    updateCertification: (id, data) =>
      set((state) => ({
        certifications: state.certifications.map((cert) =>
          cert.id === id ? { ...cert, ...data } : cert
        ),
      })),
    deleteCertification: (id) =>
      set((state) => ({
        certifications: state.certifications.filter((cert) => cert.id !== id),
      })),

    // 수상
    setAwards: (data) => set({ awards: data }),
    addAward: (data) =>
      set((state) => ({
        awards: [...state.awards, data],
      })),
    updateAward: (id, data) =>
      set((state) => ({
        awards: state.awards.map((award) => (award.id === id ? { ...award, ...data } : award)),
      })),
    deleteAward: (id) =>
      set((state) => ({
        awards: state.awards.filter((award) => award.id !== id),
      })),

    // 경험 태그
    setExpTags: (data) => set({ expTags: data }),

    // 직무 카테고리
    setJobCategories: (data) => set({ jobCategories: data }),

    // 프로필 링크
    setProfileLinks: (data) => set({ profileLinks: data }),

    // 로딩/에러 상태
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),

    // 전체 초기화
    reset: () => set(initialState),
  })
);
