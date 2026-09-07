import { api } from "./api.js";
import { DEFAULT_CATEGORIES } from "../constants/categories.js";

// Вземи всички категории
export async function getAll() {
    const result = await api.get('/categories');
    return result.data;
}

// Вземи категориите за конкретен потребител
export async function getByUserId(userId) {
    const result = await api.get(`/categories?userId=${userId}`);
    return result.data;
}

// Създай нова категория
export async function create(categoryData) {
    const result = await api.post('/categories', categoryData);
    return result.data;
}

// Вземи категория по ID
export async function getById(categoryId) {
    const result = await api.get(`/categories/${categoryId}`);
    return result.data;
}

// Обнови категория
export async function update(categoryId, categoryData) {
    const result = await api.put(`/categories/${categoryId}`, categoryData);
    return result.data;
}

// Изтрий категория
export async function remove(categoryId) {
    const result = await api.delete(`/categories/${categoryId}`);
    return result.data;
}

// Инициализирай default категории за нов потребител
// Извиква се автоматично при регистрация
export async function initializeDefaultCategories(userId) {
    try {
        const createdCategories = [];

        for (const category of DEFAULT_CATEGORIES) {
            const result = await api.post('/categories', {
                ...category,
                userId,
            });
            createdCategories.push(result.data);
        }

        return createdCategories;
    } catch (error) {
        console.error('Error initializing default categories:', error);
        throw error;
    }
}