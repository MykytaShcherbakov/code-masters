import { backendUrl } from "../apiConfig";


export async function fetchProducts() {
  try {
    const response = await fetch(`${backendUrl}/products/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch categories for Home page:', error);
    throw new Response('Failed to load categories.', { status: 500 });
  }
}