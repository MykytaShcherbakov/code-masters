export async function fetchCategoryWithProducts({ params }) {
  const { categoryId } = params;

  // Загружаем все продукты
  const productsRes = await fetch('http://localhost:3333/products/all');
  if (!productsRes.ok) {
    throw new Error(`Error loading products`);
  }
  const products = await productsRes.json();

  // Загружаем список всех категорий
  const categoriesRes = await fetch('http://localhost:3333/categories/all');
  if (!categoriesRes.ok) {
    throw new Error(`Error loading categories`);
  }
  const categories = await categoriesRes.json();

  const category = categories.find(cat => cat.id === +categoryId);

  return {
    products,
    category,
  };
}
