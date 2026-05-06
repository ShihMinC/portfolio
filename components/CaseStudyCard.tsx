"use client";

import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  year: string;
  subtitle: string;
  tags: string[];
  cover?: string;
}

export default function CaseStudyCard({ slug, title, year, subtitle, tags, cover }: Props) {
  return (
    <Link href={`/work/${slug}`} style={{ display: "block", textDecoration: "none" }}>
      <div
        className="cs-card"
        style={{
          backgroundColor: "var(--warm-white)",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid rgba(28,25,23,0.07)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(28,25,23,0.10)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Cover image */}
        <div style={{ aspectRatio: "16/9", overflow: "hidden", backgroundColor: "var(--cream-dark)" }}>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.35s ease" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--cream-dark), var(--cream))" }} />
          )}
        </div>

        {/* Text content */}
        <div style={{ padding: "1.4rem 1.5rem 1.6rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: "Lora, serif",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              fontWeight: 400,
              color: "var(--ink)",
            }}>
              {title}
            </h2>
            {year && (
              <span style={{ fontSize: "0.78rem", color: "var(--ink-light)", fontWeight: 300 }}>
                · {year}
              </span>
            )}
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--ink-light)", fontWeight: 300, lineHeight: 1.5, marginBottom: "1rem" }}>
            {subtitle}
          </p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {tags.map(tag => (
              <span key={tag} style={{
                fontSize: "0.68rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                padding: "0.2rem 0.55rem",
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
      </div>
    </Link>
  );
}
