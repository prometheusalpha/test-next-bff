export const runtime = "edge";

export async function POST(request: Request) {
  let data = await request.json();
  let search = data.search || "No search term provided";

  // send data to another API
  let response = await fetch("https://httpbin.org/post", {
    method: "POST",
    body: JSON.stringify({ search: search }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let text = await response.text();
  // send response
  return new Response(text, { status: 200 });
}
