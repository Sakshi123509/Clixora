// ═══════════════════════════════════════════════════════════════
// useScrollAnimation.js — Custom hook for scroll-triggered animations
// ═══════════════════════════════════════════════════════════════
// HOW IT WORKS:
//   IntersectionObserver API use karta hai — jab element viewport
//   mein aata hai, tab "visible" ho jaata hai aur class add hoti hai
//
// USAGE:
//   const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
//   <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>...</div>
//
// OPTIONS:
//   threshold  → 0-1, kitna visible hone pe trigger ho (default 0.15)
//   delay      → milliseconds mein delay (default 0)
//   once       → true = sirf ek baar animate, false = baar baar (default true)
// ═══════════════════════════════════════════════════════════════

import { useEffect, useRef, useState } from "react";

export function useScrollAnimation({ threshold = 0.15, delay = 0, once = true } = {}) {
  const ref = useRef(null);                    // DOM element ka reference
  const [isVisible, setIsVisible] = useState(false); // visible hai ya nahi

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // IntersectionObserver — browser native API
    // Ye observe karta hai ki element viewport mein hai ya nahi
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay ke baad visible karo
          setTimeout(() => setIsVisible(true), delay);
          // once=true hai toh observe karna band karo (performance)
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false); // scroll out hone pe hide
        }
      },
      { threshold } // kitna % visible hone pe fire karo
    );

    observer.observe(element);
    return () => observer.disconnect(); // cleanup
  }, [threshold, delay, once]);

  return { ref, isVisible };
}

// ── Helper: multiple elements ke liye staggered animation ─────
// USAGE:
//   const refs = useStaggeredAnimation(4, { staggerDelay: 100 });
//   refs.map((r, i) => <div ref={r.ref} style={r.style}>...</div>)
export function useStaggeredAnimation(count, { staggerDelay = 100, threshold = 0.1 } = {}) {
  // count kitne items hain, staggerDelay = har item mein kitna gap
  return Array.from({ length: count }, (_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useScrollAnimation({ threshold, delay: i * staggerDelay })
  );
}