// app/api/github/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ items: [] }), { status: 400 });
  }

  const res = await fetch(`https://api.github.com/search/issues?q=${query}`);
  const data = await res.json();

  return new Response(JSON.stringify(data));
}