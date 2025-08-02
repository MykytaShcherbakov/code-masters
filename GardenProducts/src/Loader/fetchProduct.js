import { backendUrl } from "../apiConfig";

export async function fetchProduct({ params }) {
  const response = await fetch(`${backendUrl}/products/${params.id}`);

  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}