import { getCaseStudies } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  const caseStudies = await getCaseStudies();
  return NextResponse.json(caseStudies);
}
