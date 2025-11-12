import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type LanguageRequest = {
  languageName: string;
  issuer?: string;
  issueDate: string;
};

export type LanguageResponse = {
  id: number;
  languageName: string;
  issuer: string | null;
  issueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type LanguageListItem = LanguageResponse;

/** 어학 생성 (POST /api/profile/Languages) */
export function createLanguage(body: LanguageRequest): Promise<LanguageResponse> {
  return post<LanguageResponse>(API_ENDPOINTS.LANGUAGES.CREATE, body, {
    credentials: "include",
  });
}

/** 내 어학 목록 조회 (GET /api/profile/Languages) */
export function fetchMyLanguages(): Promise<LanguageListItem[]> {
  return get<LanguageListItem[]>(API_ENDPOINTS.LANGUAGES.LIST, {
    credentials: "include",
  });
}

/** 어학 수정 (PUT /api/profile/Languages/{id}) */
export function updateLanguage(id: number, body: LanguageRequest): Promise<LanguageResponse> {
  return put<LanguageResponse>(API_ENDPOINTS.LANGUAGES.UPDATE(id), body, {
    credentials: "include",
  });
}

/** 어학 삭제 (DELETE /api/profile/Languages/{id}) → 204 No Content */
export async function deleteLanguage(id: number): Promise<void> {
  await del<void>(API_ENDPOINTS.LANGUAGES.DELETE(id), {
    credentials: "include",
  });
}
