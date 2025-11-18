import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type AwardRequest = {
  title: string;
  organization: string; // 기존 dept → 백엔드의 description/organization 중 선택
  awardDate: string; // YYYY-MM-DD
  description: string; // 상세 내용 (없으면 "")
};

export type AwardResponse = {
  id: number;
  title: string;
  organization: string;
  awardDate: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type AwardListItem = AwardResponse;

// CREATE
export function createAward(body: AwardRequest): Promise<AwardResponse> {
  return post<AwardResponse>(API_ENDPOINTS.AWARDS.CREATE, body, {
    credentials: "include",
  });
}

// LIST
export function fetchMyAwards(): Promise<AwardListItem[]> {
  return get<AwardListItem[]>(API_ENDPOINTS.AWARDS.LIST, {
    credentials: "include",
  });
}

// UPDATE
export function updateAward(id: number, body: AwardRequest): Promise<AwardResponse> {
  return put<AwardResponse>(API_ENDPOINTS.AWARDS.UPDATE(id), body, {
    credentials: "include",
  });
}

// DELETE
export async function deleteAward(id: number): Promise<void> {
  await del<void>(API_ENDPOINTS.AWARDS.DELETE(id), {
    credentials: "include",
  });
}
