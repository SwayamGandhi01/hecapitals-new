"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children up as they scroll into view.
 *
 * The hidden state lives in CSS behind `@media (scripting: enabled) and
 * (prefers-reduced-motion: no-preference)`, so content stays visible with
 * JavaScript off or reduced motion on. This component only flips the
 * `data-visible` attribute; it never hides anything by itself.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  /** Stagger in ms. Keep well under the 800ms ceiling for the whole sequence. */
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-visible={visible ? "true" : undefined}
      className={`he-reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
