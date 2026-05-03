import { getCaseStudies } from "@/lib/notion";
import Link from "next/link";
import CaseStudyCard from "@/components/CaseStudyCard";

function getProperty(props: any, key: string, type: string) {
  const prop = props[key];
  if (!prop) return "";
  if (type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (type === "select") return prop.select?.name ?? "";
  if (type === "multi_select") return prop.multi_select?.map((t: any) => t.name) ?? [];
  return "";
}

export default async function Home() {
  const caseStudies = await getCaseStudies();

  return (
    <main style={{ minHeight: "100vh", padding: "0" }}>
      {/* Nav */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem 3rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(247,243,238,0.85)",
        borderBottom: "1px solid rgba(28,25,23,0.06)",
      }}>
        <span style={{ fontFamily: "Lora, serif", fontSize: "1.1rem", fontWeight: 500 }}>
          Shih-Min Chen
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          <Link href="/" style={{ fontSize: "0.9rem", color: "var(--terracotta)", fontWeight: 500 }}>Work</Link>
          <Link href="/about" style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>About</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        padding: "6rem 3rem 4rem",
        maxWidth: "900px",
      }}>
        <p style={{
          fontSize: "0.8rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--terracotta)",
          marginBottom: "1.5rem",
          fontWeight: 500,
        }}>
          UX & Product Designer
        </p>
        <h1 style={{
          fontFamily: "Lora, serif",
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
          lineHeight: 1.2,
          fontWeight: 400,
          color: "var(--ink)",
          maxWidth: "700px",
        }}>
          Creating clarity in B2B platforms, enterprise UX & AI tools
        </h1>
        <p style={{
          marginTop: "1.5rem",
          fontSize: "1.05rem",
          color: "var(--ink-light)",
          lineHeight: 1.7,
          maxWidth: "520px",
          fontWeight: 300,
        }}>
          Currently at ASUS AICS, designing healthcare systems and generative AI experiences.
        </p>
      </section>

      {/* Divider */}
      <div style={{
        margin: "0 3rem",
        height: "1px",
        backgroundColor: "rgba(28,25,23,0.1)",
      }} />

      {/* Case Studies */}
      <section style={{ padding: "4rem 3rem 8rem" }}>
        <p style={{
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-light)",
          marginBottom: "3rem",
          fontWeight: 500,
        }}>
          Selected Work
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "rgba(28,25,23,0.08)" }}>
          {caseStudies.map((page: any) => {
            const name = getProperty(page.properties, "Name", "title");
            const subtitle = getProperty(page.properties, "Subtitle", "rich_text");
            const tags = getProperty(page.properties, "Tags", "multi_select") as string[];
            const [title, year] = name.split("．");

            return (
              <CaseStudyCard
                key={page.id}
                slug={page.id}
                title={title?.trim()}
                year={year?.trim() ?? ""}
                subtitle={subtitle}
                tags={tags}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
