export async function fetchCategories() {
  const response = await fetch(`http://localhost:3333/categories/all`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
