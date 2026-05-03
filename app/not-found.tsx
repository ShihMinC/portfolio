import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 2rem",
      backgroundColor: "var(--cream)",
    }}>
      <h1 style={{
        fontFamily: "Lora, serif",
        fontSize: "clamp(4rem, 10vw, 8rem)",
        fontWeight: 400,
        color: "var(--terracotta)",
        marginBottom: "1rem",
        opacity: 0.8,
      }}>
        404
      </h1>
      <p style={{
        fontSize: "1.2rem",
        color: "var(--ink)",
        marginBottom: "2rem",
        fontWeight: 300,
        maxWidth: "400px",
        lineHeight: 1.6,
      }}>
        The page you are looking for has been moved to another dimension or never existed at all.
      </p>
      <Link href="/" style={{
        padding: "0.8rem 2rem",
        border: "1px solid var(--ink)",
        color: "var(--ink)",
        fontSize: "0.9rem",
        letterSpacing: "0.05em",
        transition: "all 0.3s ease",
        textTransform: "uppercase",
      }}>
        Return Home
      </Link>
    </main>
  );
}
