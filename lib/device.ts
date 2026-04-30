"use client";

import { useEffect, useState } from "react";

export function useDeviceTier() {
  const [tier, setTier] = useState<"low" | "mid" | "high">("high");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(ua) || window.innerWidth < 768;
    setIsMobile(mobile);

    const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency ?? 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

    let t: "low" | "mid" | "high" = "high";
    if (mobile && (cores <= 4 || memory <= 3)) t = "low";
    else if (mobile) t = "mid";
    else if (cores <= 4) t = "mid";
    setTier(t);
  }, []);

  return { tier, isMobile };
}
