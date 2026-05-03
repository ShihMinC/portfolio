// app/work/[id]/page.tsx
import { notion } from "@/lib/notion";
import { notFound } from "next/navigation";

// ─── helpers ────────────────────────────────────────────────────────────────

function getProperty(props: any, key: string, type: string) {
  const prop = props[key];
  if (!prop) return type === "multi_select" ? [] : "";
  if (type === "title") return prop.title?.[0]?.plain_text ?? "";
  if (type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (type === "select") return prop.select?.name ?? "";
  if (type === "multi_select") return prop.multi_select?.map((t: any) => t.name) ?? [];
  return "";
}

/** Recursively fetch blocks, including children of column_list/column/toggle etc. */
async function getBlocksRecursive(blockId: string): Promise<any[]> {
  const response = await notion.blocks.children.list({ block_id: blockId, page_size: 100 });
  const blocks = response.results as any[];

  const withChildren = await Promise.all(
    blocks.map(async (block) => {
      if (block.has_children) {
        block._children = await getBlocksRecursive(block.id);
      }
      return block;
    })
  );

  return withChildren;
}

/** Proxy Notion file URLs through our API route so they never expire. */
function proxyImageUrl(url: string) {
  if (!url) return "";
  // External URLs (e.g. uploaded to imgur) don't need proxying
  if (!url.includes("prod-files-secure.s3") && !url.includes("secure.notion-static")) return url;
  return `/api/notion-image?url=${encodeURIComponent(url)}`;
}

// ─── rich text renderer (supports bold, italic, code, links) ─────────────────

function RichText({ rich_text }: { rich_text: any[] }) {
  if (!rich_text?.length) return null;
  return (
    <>
      {rich_text.map((t: any, i: number) => {
        let node: React.ReactNode = t.plain_text;
        const { bold, italic, code, strikethrough, underline } = t.annotations ?? {};
        if (code) node = <code key={i} style={{ fontFamily: "monospace", fontSize: "0.88em", backgroundColor: "rgba(28,25,23,0.06)", padding: "0.1em 0.3em", borderRadius: "3px" }}>{node}</code>;
        if (bold) node = <strong key={i} style={{ fontWeight: 600 }}>{node}</strong>;
        if (italic) node = <em key={i}>{node}</em>;
        if (strikethrough) node = <s key={i}>{node}</s>;
        if (underline) node = <u key={i}>{node}</u>;
        if (t.href) node = <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--terracotta)", textDecoration: "underline", textUnderlineOffset: "2px" }}>{node}</a>;
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

// ─── block renderer ──────────────────────────────────────────────────────────

function Block({ block }: { block: any }) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {

    case "heading_1":
      return (
        <h1 key={id} style={{ fontFamily: "Lora, serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "var(--ink)", margin: "3rem 0 1rem", lineHeight: 1.3 }}>
          <RichText rich_text={value.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 key={id} style={{ fontFamily: "Lora, serif", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 400, color: "var(--ink)", margin: "2.5rem 0 0.75rem", lineHeight: 1.4 }}>
          <RichText rich_text={value.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 key={id} style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", margin: "2rem 0 0.5rem", letterSpacing: "0.02em" }}>
          <RichText rich_text={value.rich_text} />
        </h3>
      );

    case "paragraph": {
      if (!value.rich_text?.length) return <br key={id} />;
      return (
        <p key={id} style={{ fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.8, marginBottom: "1rem", fontWeight: 300 }}>
          <RichText rich_text={value.rich_text} />
        </p>
      );
    }

    case "bulleted_list_item":
      return (
        <li key={id} style={{ fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.8, fontWeight: 300, marginBottom: "0.4rem", marginLeft: "1.2rem" }}>
          <RichText rich_text={value.rich_text} />
          {block._children && <ul>{block._children.map((c: any) => <Block key={c.id} block={c} />)}</ul>}
        </li>
      );

    case "numbered_list_item":
      return (
        <li key={id} style={{ fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.8, fontWeight: 300, marginBottom: "0.4rem", marginLeft: "1.2rem", listStyleType: "decimal" }}>
          <RichText rich_text={value.rich_text} />
          {block._children && <ol>{block._children.map((c: any) => <Block key={c.id} block={c} />)}</ol>}
        </li>
      );

    case "image": {
      const rawSrc = value.type === "external" ? value.external.url : value.file?.url ?? "";
      const src = proxyImageUrl(rawSrc);
      const caption = value.caption?.map((t: any) => t.plain_text).join("") ?? "";
      return (
        <figure key={id} style={{ margin: "2.5rem 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={caption || "Case study image"} style={{ width: "100%", borderRadius: "4px", display: "block" }} />
          {caption && (
            <figcaption style={{ fontSize: "0.8rem", color: "var(--ink-light)", marginTop: "0.5rem", textAlign: "center", fontStyle: "italic" }}>
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      const videoUrl = value.type === "external" ? value.external.url : value.file?.url ?? "";
      // Convert YouTube watch URLs to embed
      const embedUrl = videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "www.youtube.com/embed/");
      const isYoutube = embedUrl.includes("youtube.com/embed");
      if (isYoutube) {
        return (
          <div key={id} style={{ margin: "2.5rem 0", aspectRatio: "16/9", position: "relative" }}>
            <iframe src={embedUrl} style={{ width: "100%", height: "100%", borderRadius: "4px", border: "none" }} allowFullScreen />
          </div>
        );
      }
      return (
        <video key={id} src={videoUrl} controls style={{ width: "100%", borderRadius: "4px", margin: "2.5rem 0" }} />
      );
    }

    case "divider":
      return <hr key={id} style={{ border: "none", borderTop: "1px solid rgba(28,25,23,0.1)", margin: "3rem 0" }} />;

    case "callout":
      return (
        <div key={id} style={{ backgroundColor: "rgba(196,98,45,0.06)", borderLeft: "3px solid var(--terracotta)", padding: "1rem 1.5rem", margin: "1.5rem 0", borderRadius: "0 4px 4px 0" }}>
          {value.rich_text?.length > 0 && (
            <p style={{ fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
              <RichText rich_text={value.rich_text} />
            </p>
          )}
          {block._children && (
            <div style={{ marginTop: value.rich_text?.length > 0 ? "0.75rem" : 0 }}>
              {groupBlocks(block._children).map(renderGroup)}
            </div>
          )}
        </div>
      );

    case "quote":
      return (
        <blockquote key={id} style={{ borderLeft: "3px solid var(--terracotta)", paddingLeft: "1.5rem", margin: "2rem 0", fontFamily: "Lora, serif", fontSize: "1.1rem", color: "var(--ink)", fontStyle: "italic", lineHeight: 1.7 }}>
          <RichText rich_text={value.rich_text} />
        </blockquote>
      );

    case "code":
      return (
        <pre key={id} style={{ backgroundColor: "rgba(28,25,23,0.04)", border: "1px solid rgba(28,25,23,0.08)", borderRadius: "4px", padding: "1.25rem 1.5rem", overflowX: "auto", margin: "1.5rem 0" }}>
          <code style={{ fontFamily: "monospace", fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.7 }}>
            {value.rich_text?.map((t: any) => t.plain_text).join("")}
          </code>
        </pre>
      );

    case "toggle":
      return (
        <details key={id} style={{ margin: "1rem 0", border: "1px solid rgba(28,25,23,0.1)", borderRadius: "4px", padding: "0.75rem 1rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 500, color: "var(--ink)", fontSize: "1rem" }}>
            <RichText rich_text={value.rich_text} />
          </summary>
          <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(28,25,23,0.06)" }}>
            {block._children?.map((c: any) => <Block key={c.id} block={c} />)}
          </div>
        </details>
      );

    case "column_list":
      return (
        <div key={id} style={{
          display: "grid",
          gridTemplateColumns: `repeat(${block._children?.length ?? 2}, 1fr)`,
          gap: "2rem",
          margin: "2rem 0",
        }}>
          {block._children?.map((col: any) => <Block key={col.id} block={col} />)}
        </div>
      );

    case "column":
      return (
        <div key={id} style={{ minWidth: 0 }}>
          {block._children?.map((c: any) => <Block key={c.id} block={c} />)}
        </div>
      );

    case "table": {
      const children = block._children ?? [];
      return (
        <div key={id} style={{ overflowX: "auto", margin: "2rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <tbody>
              {children.map((row: any, ri: number) => (
                <tr key={row.id} style={{ backgroundColor: ri === 0 && value.has_column_header ? "rgba(196,98,45,0.06)" : "transparent" }}>
                  {row.table_row?.cells?.map((cell: any, ci: number) => {
                    const Tag = (ri === 0 && value.has_column_header) || (ci === 0 && value.has_row_header) ? "th" : "td";
                    return (
                      <Tag key={ci} style={{ padding: "0.6rem 0.8rem", border: "1px solid rgba(28,25,23,0.1)", textAlign: "left", fontWeight: Tag === "th" ? 600 : 300, color: "var(--ink)" }}>
                        <RichText rich_text={cell} />
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case "bookmark":
    case "link_preview": {
      const url = value.url ?? "";
      return (
        <a key={id} href={url} target="_blank" rel="noopener noreferrer" style={{
          display: "block",
          padding: "0.75rem 1rem",
          margin: "1.5rem 0",
          border: "1px solid rgba(28,25,23,0.1)",
          borderRadius: "4px",
          color: "var(--terracotta)",
          fontSize: "0.9rem",
          wordBreak: "break-all",
          textDecoration: "none",
        }}>
          🔗 {url}
        </a>
      );
    }

    default:
      // Unsupported block — render nothing silently
      return null;
  }
}

// ─── group consecutive list items ────────────────────────────────────────────

function groupBlocks(blocks: any[]) {
  const groups: any[] = [];
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    if (block.type === "bulleted_list_item") {
      const items = [];
      while (i < blocks.length && blocks[i].type === "bulleted_list_item") {
        items.push(blocks[i++]);
      }
      groups.push({ type: "ul", items });
    } else if (block.type === "numbered_list_item") {
      const items = [];
      while (i < blocks.length && blocks[i].type === "numbered_list_item") {
        items.push(blocks[i++]);
      }
      groups.push({ type: "ol", items });
    } else {
      groups.push(block);
      i++;
    }
  }
  return groups;
}

function renderGroup(group: any) {
  if (group.type === "ul") {
    return (
      <ul key={group.items[0].id} style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
        {group.items.map((b: any) => <Block key={b.id} block={b} />)}
      </ul>
    );
  }
  if (group.type === "ol") {
    return (
      <ol key={group.items[0].id} style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
        {group.items.map((b: any) => <Block key={b.id} block={b} />)}
      </ol>
    );
  }
  return <Block key={group.id} block={group} />;
}

// ─── page ────────────────────────────────────────────────────────────────────

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let page: any;
  try {
    page = await notion.pages.retrieve({ page_id: id });
  } catch {
    notFound();
  }

  const blocks = await getBlocksRecursive(id);

  const name = getProperty(page.properties, "Name", "title");
  const subtitle = getProperty(page.properties, "Subtitle", "rich_text");
  const tags = getProperty(page.properties, "Tags", "multi_select") as string[];
  const [title, year] = name.split("．");

  const groups = groupBlocks(blocks);

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "2rem 3rem", position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(12px)", backgroundColor: "rgba(247,243,238,0.85)",
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
              fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "0.25rem 0.6rem", backgroundColor: "rgba(196,98,45,0.08)",
              color: "var(--terracotta)", borderRadius: "2px", fontWeight: 500,
            }}>
              {tag}
            </span>
          ))}
          {year && <span style={{ fontSize: "0.7rem", color: "var(--ink-light)", alignSelf: "center" }}>{year.trim()}</span>}
        </div>
        <h1 style={{ fontFamily: "Lora, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.2, marginBottom: "1rem" }}>
          {title?.trim()}
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-light)", fontWeight: 300, lineHeight: 1.6 }}>
          {subtitle}
        </p>
      </header>

      <div style={{ height: "1px", backgroundColor: "rgba(28,25,23,0.1)", margin: "0 3rem" }} />

      {/* Content */}
      <article style={{ padding: "4rem 3rem 8rem", maxWidth: "720px" }}>
        {groups.map(renderGroup)}
      </article>
    </main>
  );
}
