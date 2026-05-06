import { getCaseStudies, notion } from "@/lib/notion";
import CaseStudyCard from "@/components/CaseStudyCard";
import Navbar from "@/components/Navbar";

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

  // Build a lightweight list for the Navbar dropdown
  const navItems = caseStudies.map((page: any) => {
    const nameProp = page.properties["Name"];
    const fullName = nameProp?.title?.[0]?.plain_text ?? "Untitled";
    const [title] = fullName.split("．");
    return { id: page.id, title: title?.trim() ?? fullName };
  });

  return (
    <main style={{ minHeight: "100vh" }}>
      {/* Nav */}
      <Navbar caseStudies={navItems} />

      {/* Hero */}
      <section className="container" style={{
        paddingTop: "var(--hero-pt)",
        paddingBottom: "var(--section-py)",
      }}>
        <h1 style={{
          fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
          fontSize: "clamp(2rem, 5vw, 2.5rem)",
          fontWeight: 700,
          color: "var(--terracotta)",
          marginBottom: "1.5rem",
        }}>
          ShihMin Chen
        </h1>
        
        <p style={{
          fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
          fontSize: "clamp(1.8rem, 6vw, 3.2rem)",
          lineHeight: 1.2,
          fontWeight: 700,
          color: "var(--ink)",
          maxWidth: "800px",
          marginBottom: "1.5rem",
        }}>
          <em style={{ fontStyle: "italic", fontWeight: 700 }}>Creating clarity in</em> <br/>
          <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 700 }}>B2B</em> platforms, <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 700 }}>Enterprise</em> UX &amp; <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 700 }}>AI</em> tools
        </p>
        
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "var(--ink-light)",
          lineHeight: 1.6,
          maxWidth: "700px",
          fontWeight: 400,
          fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
        }}>
          Specializing in complex B2B platforms and AI-enabled workflows.
          <br />
          With expertise in enterprise UX @Asus AICS &amp; hands-on AI product design @Morph
        </p>
      </section>


      {/* Divider */}
      <div className="container">
        <div style={{
          height: "1px",
          backgroundColor: "rgba(28,25,23,0.1)",
        }} />
      </div>

      {/* Case Studies */}
      <section className="container" style={{ 
        paddingTop: "var(--section-py)",
        paddingBottom: "8rem" 
      }}>
        <h2 style={{
          fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "var(--ink)",
          marginBottom: "2rem",
        }}>
          Selected Work
        </h2>

        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
          gap: "1.5rem",
        }}>
          {await Promise.all(caseStudies.map(async (page: any) => {
            const name = getProperty(page.properties, "Name", "title");
            const subtitle = getProperty(page.properties, "Subtitle", "rich_text");
            const tags = getProperty(page.properties, "Tags", "multi_select") as string[];
            const [title, year] = name.split("．");
            
            // Extract cover image URL from Notion page
            let rawCover = page.cover?.type === "external"
              ? page.cover.external?.url
              : page.cover?.file?.url;

            // If no cover is explicitly set, use the first image in the page's blocks
            if (!rawCover) {
              try {
                const blocksResponse = await notion.blocks.children.list({ block_id: page.id, page_size: 50 });
                const firstImage = blocksResponse.results.find((b: any) => b.type === "image");
                if (firstImage) {
                  rawCover = (firstImage as any).image?.type === "external"
                    ? (firstImage as any).image.external?.url
                    : (firstImage as any).image?.file?.url;
                }
              } catch (err) {
                // Ignore fetch errors for blocks
              }
            }

            // Proxy signed S3 URLs through our API route
            const cover = rawCover
              ? (rawCover.includes("prod-files-secure.s3") || rawCover.includes("secure.notion-static")
                  ? `/api/notion-image?url=${encodeURIComponent(rawCover)}`
                  : rawCover)
              : undefined;

            return (
              <CaseStudyCard
                key={page.id}
                slug={page.id}
                title={title?.trim()}
                year={year?.trim() ?? ""}
                subtitle={subtitle}
                tags={tags}
                cover={cover}
              />
            );
          }))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--ink)",
      color: "rgba(253,250,247,0.7)",
      padding: "3rem var(--page-px)",
    }}>
      <div style={{
        maxWidth: "var(--page-max-width)",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "2rem",
      }}>
        {/* Left */}
        <div>
          <p style={{ fontFamily: "Lora, serif", fontSize: "1.1rem", color: "var(--warm-white)", marginBottom: "1.2rem" }}>
            Min
          </p>
          <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem" }}>
            <a href="/about" style={{ color: "rgba(253,250,247,0.6)", textDecoration: "none" }}>About</a>
            <a href="https://docs.google.com/document/d/1HrHsQaFqE_x-I6TIMGiR_J4mjcrYcuo2dwMPbaCzrvM/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(253,250,247,0.6)", textDecoration: "none" }}>Resume</a>
          </div>
        </div>

        {/* Right — social icons */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a href="https://www.linkedin.com/in/shih-min-chen/" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(253,250,247,0.6)", display: "flex", alignItems: "center" }}
            aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      <div style={{
        maxWidth: "var(--page-max-width)",
        margin: "2rem auto 0",
        paddingTop: "1.5rem",
        borderTop: "1px solid rgba(253,250,247,0.1)",
        fontSize: "0.78rem",
        color: "rgba(253,250,247,0.35)",
      }}>
        ©{new Date().getFullYear()} Portfolio by Shih-Min Chen.
      </div>
    </footer>
  );
}
