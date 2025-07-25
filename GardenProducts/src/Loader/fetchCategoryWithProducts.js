// export async function fetchCategoryWithProducts({ params }) {
//   const { categoryId } = params;

//   // Загружаем все продукты
//   const productsRes = await fetch('http://localhost:3333/products/all');
//   if (!productsRes.ok) {
//     throw new Error(`Error loading products`);
//   }
//   const products = await productsRes.json();

//   // Загружаем список всех категорий
//   const categoriesRes = await fetch('http://localhost:3333/categories/all');
//   if (!categoriesRes.ok) {
//     throw new Error(`Error loading categories`);
//   }
//   const categories = await categoriesRes.json();

//   const category = categories.find(cat => cat.id === +categoryId);

//   return {
//     products,
//     category,
//   };
// }






// Loader/fetchCategoryWithProducts.js

export async function fetchCategoryWithProducts({ params }) {
  const { categoryId } = params;

  // Загружаем все продукты (предполагая, что API /products/all возвращает categoryId)
  const productsRes = await fetch('http://localhost:3333/products/all');
  if (!productsRes.ok) {
    throw new Error(`Error loading products`);
  }
  const allProducts = await productsRes.json();

  // Загружаем список всех категорий
  const categoriesRes = await fetch('http://localhost:3333/categories/all');
  if (!categoriesRes.ok) {
    throw new Error(`Error loading categories`);
  }
  const allCategories = await categoriesRes.json();

  // Ищем текущую категорию
  const category = allCategories.find((cat) => cat.id === Number(categoryId));

  if (!category) {
    throw new Response(`Category with ID ${categoryId} not found`, { status: 404 });
  }

  // Фильтруем продукты по текущей категории. categoryId уже есть в product
  const filteredProducts = allProducts.filter(
    (product) => product.categoryId && product.categoryId === Number(categoryId)
  );

  return {
    products: filteredProducts, // Продукты уже содержат categoryId от API
    category,
  };
}