export async function GET(req) {

  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  const res = await fetch(
    `https://api.github.com/search/issues?q=${query}`
  )

  const data = await res.json()

  return Response.json(data)
}