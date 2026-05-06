"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface CaseStudyItem {
  id: string;
  title: string;
}

interface NavbarProps {
  caseStudies: CaseStudyItem[];
}

export default function Navbar({ caseStudies }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem var(--page-px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(247,243,238,0.85)",
        borderBottom: "1px solid rgba(28,25,23,0.06)",
      }}
    >
      <Link
        href="/"
        style={{ fontFamily: "Lora, serif", fontSize: "1.1rem", fontWeight: 500, color: "var(--ink)" }}
      >
        Shih-Min Chen
      </Link>

      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {/* Work dropdown */}
        <div ref={ref} style={{ position: "relative" }}>
          <button
            id="nav-work-btn"
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "inherit",
              fontWeight: 500,
              color: "var(--terracotta)",
              padding: 0,
            }}
          >
            Work
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              style={{
                transition: "transform 0.2s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dropdown panel */}
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 1rem)",
              right: 0,
              minWidth: "260px",
              backgroundColor: "var(--warm-white)",
              border: "1px solid rgba(28,25,23,0.08)",
              borderRadius: "6px",
              boxShadow: "0 8px 32px rgba(28,25,23,0.10), 0 2px 8px rgba(28,25,23,0.06)",
              overflow: "hidden",
              // Animation
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              pointerEvents: open ? "auto" : "none",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-light)",
                fontWeight: 500,
                padding: "0.9rem 1.2rem 0.5rem",
              }}
            >
              Case Studies
            </p>
            <ul style={{ listStyle: "none", padding: "0 0 0.5rem" }}>
              {caseStudies.map((item, index) => (
                <li key={item.id}>
                  <Link
                    href={`/work/${item.id}`}
                    onClick={() => setOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.65rem 1.2rem",
                      fontSize: "0.88rem",
                      color: "var(--ink)",
                      fontWeight: 300,
                      transition: "background-color 0.15s ease, color 0.15s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cream-dark)";
                      (e.currentTarget as HTMLElement).style.color = "var(--terracotta)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "var(--ink)";
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "var(--terracotta)",
                        opacity: 0.6,
                        fontFamily: "Lora, serif",
                        minWidth: "1.2rem",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link href="/about" style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>
          About
        </Link>
        <Link href="/resume" style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>
          Resume
        </Link>
      </div>
    </nav>
  );
}
