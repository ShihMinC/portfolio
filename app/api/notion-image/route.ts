// app/api/notion-image/route.ts
// Proxies Notion file URLs so they never expire for the end user.
// Usage: <img src={`/api/notion-image?url=${encodeURIComponent(notionUrl)}`} />

import { notion } from "@/lib/notion";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  try {
    // Fetch the image from Notion's CDN (server-side, token not needed for signed URLs)
    const res = await fetch(url);
    if (!res.ok) return new NextResponse("Failed to fetch image", { status: res.status });

    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    const buffer = await res.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        // Cache for 55 minutes (Notion URLs expire at 60 min)
        "Cache-Control": "public, max-age=3300, stale-while-revalidate=60",
      },
    });
  } catch (err) {
    return new NextResponse("Proxy error", { status: 500 });
  }
}
