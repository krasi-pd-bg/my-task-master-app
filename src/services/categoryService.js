import { api } from "./api.js";

// Default категории които се създават при регистрация
const DEFAULT_CATEGORIES = [
    { name: 'Work', icon: 'briefcase-outline', color: '#4A90E2' },
    { name: 'Personal', icon: 'person-outline', color: '#E24A4A' },
    { name: 'Study', icon: 'book-outline', color: '#8E44AD' },
    { name: 'Shopping', icon: 'cart-outline', color: '#27AE60' },
    { name: 'Health', icon: 'heart-outline', color: '#E67E22' },
];

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