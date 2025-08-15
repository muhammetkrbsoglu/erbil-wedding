"use client";

import { useCallback } from "react";

type ScrollOptions = {
  offset?: number;
  behavior?: ScrollBehavior;
};

export function useSmoothScroll() {
  const scrollTo = useCallback((selector: string | number, opts: ScrollOptions = {}) => {
    const behavior = opts.behavior ?? "smooth";
    const offset = opts.offset ?? 0;

    let top: number | null = null;

    if (typeof selector === "number") {
      top = selector;
    } else {
      const el = document.querySelector(selector);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      top = window.scrollY + rect.top - offset;
    }

    // Browser-native smooth scroll with custom easing fallback handled by CSS variable in globals
    window.scrollTo({ top, behavior });
  }, []);

  return { scrollTo };
}

export default useSmoothScroll;
