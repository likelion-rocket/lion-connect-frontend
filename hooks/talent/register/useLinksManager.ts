// hooks/useLinksManager.ts
import { useState, useRef, useEffect } from "react";
import { fetchMyProfileLinks, deleteMyProfileLink } from "@/lib/api/profileThumbnail";

export type LinkRow = {
  type: string;
  url: string;
};

export function useLinksManager() {
  const [links, setLinks] = useState<LinkRow[]>([{ type: "LINK", url: "" }]);
  const [initialLinkTypes, setInitialLinkTypes] = useState<string[]>([]);

  const dataLoadedRef = useRef(false);

  // 서버에서 기존 링크 데이터 불러오기
  useEffect(() => {
    if (dataLoadedRef.current) return;

    (async () => {
      try {
        const allLinks = await fetchMyProfileLinks();
        const external = allLinks.filter((l) => (l.type || "").toUpperCase() !== "THUMBNAIL");

        if (external.length > 0) {
          setLinks(
            external.map((l, idx) => ({
              type: l.type || `LINK_${idx + 1}`,
              url: l.url,
            }))
          );
          setInitialLinkTypes(external.map((l) => (l.type || "").toUpperCase()));
        } else {
          setLinks([{ type: "LINK", url: "" }]);
          setInitialLinkTypes([]);
        }

        dataLoadedRef.current = true;
      } catch (e) {
        console.error("[링크] 조회 실패", e);
        dataLoadedRef.current = true;
      }
    })();
  }, []);

  const handleChangeLink = (index: number, value: string) => {
    setLinks((prev) => prev.map((row, i) => (i === index ? { ...row, url: value } : row)));
  };

  const handleAddLink = () => {
    setLinks((prev) => {
      const existing = prev.map((r) => (r.type || "").toUpperCase());
      let n = prev.length + 1;
      let candidate = n === 1 ? "LINK" : `LINK_${n}`;
      while (existing.includes(candidate.toUpperCase())) {
        n += 1;
        candidate = `LINK_${n}`;
      }
      return [...prev, { type: candidate, url: "" }];
    });
  };

  const handleDeleteLink = async (index: number) => {
    const hasMultiple = links.length > 1;
    const row = links[index];

    // UI 먼저 반영
    if (hasMultiple) {
      setLinks((prev) => prev.filter((_, i) => i !== index));
    } else {
      setLinks((prev) => (prev.length === 0 ? prev : [{ ...prev[0], url: "" }]));
    }

    const typeUpper = (row.type || "").toUpperCase();
    const existedOnServer = initialLinkTypes.includes(typeUpper);

    if (!existedOnServer) {
      return;
    }

    try {
      await deleteMyProfileLink(row.type);
      console.log(`[링크] 삭제 완료 (type=${row.type}, hasMultiple=${hasMultiple})`);
      setInitialLinkTypes((prev) => prev.filter((t) => t !== typeUpper));
    } catch (e) {
      console.error(e);
      alert("링크 삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  // 링크 저장 후 initialLinkTypes 업데이트
  const markLinksAsSaved = () => {
    setInitialLinkTypes((prev) => {
      const next = [...prev];
      for (const row of links) {
        const url = row.url.trim();
        if (!url) continue;
        const key = (row.type || "LINK").toUpperCase();
        if (!next.includes(key)) next.push(key);
      }
      return next;
    });
  };

  return {
    links,
    initialLinkTypes,
    handleChangeLink,
    handleAddLink,
    handleDeleteLink,
    markLinksAsSaved,
  };
}
