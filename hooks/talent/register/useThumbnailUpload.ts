// hooks/useThumbnailUpload.ts
import { useState, useRef, useEffect } from "react";
import { fetchMyProfileLinks } from "@/lib/api/profileThumbnail";

export function useThumbnailUpload() {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [initialThumbnailUrl, setInitialThumbnailUrl] = useState<string | null>(null);
  const [initialThumbnailFileName, setInitialThumbnailFileName] = useState<string>("");

  const prefilledThumbnailRef = useRef(false);

  // 썸네일 프리필
  useEffect(() => {
    if (prefilledThumbnailRef.current) return;

    (async () => {
      try {
        const allLinks = await fetchMyProfileLinks();
        const thumb = allLinks.find((l) => (l.type || "").toUpperCase() === "THUMBNAIL");

        if (thumb) {
          setInitialThumbnailUrl(thumb.url);
          setInitialThumbnailFileName(thumb.originalFilename ?? "");
        }

        prefilledThumbnailRef.current = true;
      } catch (e) {
        console.error("[썸네일] 조회 실패", e);
        prefilledThumbnailRef.current = true;
      }
    })();
  }, []);

  return {
    thumbnailFile,
    setThumbnailFile,
    initialThumbnailUrl,
    initialThumbnailFileName,
  };
}
