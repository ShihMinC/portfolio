import { notion } from "@/lib/notion";
import { notFound } from "next/navigation";

function getProperty(props: any, key: string, type: string) {
  const prop = props[key];
  if (!prop) return "";
  if (type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (type === "select") return prop.select?.name ?? "";
  if (type === "multi_select") return prop.multi_select?.map((t: any) => t.name) ?? [];
  return "";
}

async function getBlocks(blockId: string) {
  const response = await notion.blocks.children.list({ block_id: blockId });
  return response.results;
}

function renderBlock(block: any) {
  const { type, id } = block;
  const value = block[type];

  const richText = (arr: any[]) =>
    arr?.map((t: any) => t.plain_text).join("") ?? "";

  switch (type) {
    case "heading_1":
      return (
        <h1 key={id} style={{
          fontFamily: "Lora, serif",
          fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
          fontWeight: 400,
          color: "var(--ink)",
          margin: "3rem 0 1rem",
          lineHeight: 1.3,
        }}>
          {richText(value.rich_text)}
        </h1>
      );
    case "heading_2":
      return (
        <h2 key={id} style={{
          fontFamily: "Lora, serif",
          fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
          fontWeight: 400,
          color: "var(--ink)",
          margin: "2.5rem 0 0.75rem",
          lineHeight: 1.4,
        }}>
          {richText(value.rich_text)}
        </h2>
      );
    case "heading_3":
      return (
        <h3 key={id} style={{
          fontSize: "1rem",
          fontWeight: 500,
          color: "var(--ink)",
          margin: "2rem 0 0.5rem",
          letterSpacing: "0.02em",
        }}>
          {richText(value.rich_text)}
        </h3>
      );
    case "paragraph":
      const text = richText(value.rich_text);
      if (!text) return <br key={id} />;
      return (
        <p key={id} style={{
          fontSize: "1rem",
          color: "var(--ink-light)",
          lineHeight: 1.8,
          marginBottom: "1rem",
          fontWeight: 300,
        }}>
          {text}
        </p>
      );
    case "bulleted_list_item":
      return (
        <li key={id} style={{
          fontSize: "1rem",
          color: "var(--ink-light)",
          lineHeight: 1.8,
          fontWeight: 300,
          marginBottom: "0.4rem",
          marginLeft: "1.2rem",
        }}>
          {richText(value.rich_text)}
        </li>
      );
    case "numbered_list_item":
      return (
        <li key={id} style={{
          fontSize: "1rem",
          color: "var(--ink-light)",
          lineHeight: 1.8,
          fontWeight: 300,
          marginBottom: "0.4rem",
          marginLeft: "1.2rem",
          listStyleType: "decimal",
        }}>
          {richText(value.rich_text)}
        </li>
      );
    case "image":
      const src = value.type === "external" ? value.external.url : value.file.url;
      const caption = richText(value.caption);
      return (
        <figure key={id} style={{ margin: "2.5rem 0" }}>
          <img src={src} alt={caption || ""} style={{
            width: "100%",
            borderRadius: "4px",
            display: "block",
          }} />
          {caption && (
            <figcaption style={{
              fontSize: "0.8rem",
              color: "var(--ink-light)",
              marginTop: "0.5rem",
              textAlign: "center",
              fontStyle: "italic",
            }}>
              {caption}
            </figcaption>
          )}
        </figure>
      );
    case "divider":
      return (
        <hr key={id} style={{
          border: "none",
          borderTop: "1px solid rgba(28,25,23,0.1)",
          margin: "3rem 0",
        }} />
      );
    case "callout":
      return (
        <div key={id} style={{
          backgroundColor: "rgba(196,98,45,0.06)",
          borderLeft: "3px solid var(--terracotta)",
          padding: "1rem 1.5rem",
          margin: "1.5rem 0",
          borderRadius: "0 4px 4px 0",
        }}>
          <p style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.7, fontWeight: 300 }}>
            {richText(value.rich_text)}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let page: any;
  try {
    page = await notion.pages.retrieve({ page_id: id });
  } catch {
    notFound();
  }

  const blocks = await getBlocks(id);

  const name = getProperty(page.properties, "Name", "title");
  const subtitle = getProperty(page.properties, "Subtitle", "rich_text");
  const tags = getProperty(page.properties, "Tags", "multi_select") as string[];
  const [title, year] = name.split("．");

  return (
    <main style={{ minHeight: "100vh" }}>
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
        <a href="/" style={{ fontFamily: "Lora, serif", fontSize: "1.1rem", fontWeight: 500 }}>
          Shih-Min Chen
        </a>
        <div style={{ display: "flex", gap: "2rem" }}>
          <a href="/" style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>Work</a>
          <a href="/about" style={{ fontSize: "0.9rem", color: "var(--ink-light)" }}>About</a>
        </div>
      </nav>

      {/* Header */}
      <header style={{ padding: "5rem 3rem 3rem", maxWidth: "800px" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
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
          {year && <span style={{ fontSize: "0.7rem", color: "var(--ink-light)", alignSelf: "center" }}>{year.trim()}</span>}
        </div>
        <h1 style={{
          fontFamily: "Lora, serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 400,
          lineHeight: 1.2,
          marginBottom: "1rem",
        }}>
          {title?.trim()}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-light)", fontWeight: 300, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      </header>

      <div style={{ height: "1px", backgroundColor: "rgba(28,25,23,0.1)", margin: "0 3rem" }} />

      {/* Content */}
      <article style={{ padding: "4rem 3rem 8rem", maxWidth: "720px" }}>
        {blocks.map(renderBlock)}
      </article>
    </main>
  );
}
