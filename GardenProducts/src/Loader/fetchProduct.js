export async function fetchProduct({ params }) {
  const response = await fetch(`http://localhost:3333/products/${params.id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data[0] : data;
}
