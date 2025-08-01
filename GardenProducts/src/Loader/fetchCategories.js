import { backendUrl } from "../apiConfig";

// Асинхронная функция для получения всех категорий с бэкенда
export async function fetchCategories() {
  const response = await fetch(`${backendUrl}/categories/all`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}