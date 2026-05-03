"use client";

import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  year: string;
  subtitle: string;
  tags: string[];
}

export default function CaseStudyCard({ slug, title, year, subtitle, tags }: Props) {
  return (
    <Link href={`/work/${slug}`}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: "2rem",
          padding: "2.5rem 0",
          backgroundColor: "var(--cream)",
          transition: "background-color 0.2s ease, padding-left 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cream-dark)";
          (e.currentTarget as HTMLElement).style.paddingLeft = "1.5rem";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--cream)";
          (e.currentTarget as HTMLElement).style.paddingLeft = "0";
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
            <h2 style={{
              fontFamily: "Lora, serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontWeight: 400,
              color: "var(--ink)",
            }}>
              {title}
            </h2>
            {year && (
              <span style={{ fontSize: "0.8rem", color: "var(--ink-light)", fontWeight: 300 }}>
                {year}
              </span>
            )}
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-light)", fontWeight: 300, lineHeight: 1.5 }}>
            {subtitle}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {tags.map(tag => (
              <span key={tag} style={{
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.25rem 0.6rem",
                backgroundColor: "rgba(196,98,45,0.08)",
                color: "var(--terracotta)",
                borderRadius: "2px",
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span style={{
          fontSize: "1.5rem",
          color: "var(--ink-light)",
          opacity: 0.3,
          fontWeight: 300,
          flexShrink: 0,
        }}>→</span>
      </div>
    </Link>
  );
}
