import { api } from "./api.js";

export async function getAll() {
    const result = await api.get('/categories');

    return result.data;
}

export async function create(categoryData) {
    const result = await api.post('/categories', categoryData);

    return result.data;
}

export async function getById(categoryId) {
    const result = await api.get(`/categories/${categoryId}`);

    return result.data;
}