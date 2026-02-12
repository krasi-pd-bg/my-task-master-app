import { api } from "./api.js";

// Вземи всички задачи
export async function getAll() {
    const result = await api.get('/tasks');
    return result.data;
}

// Вземи задачите за конкретен потребител
export async function getByUserId(userId) {
    const result = await api.get(`/tasks?userId=${userId}`);
    return result.data;
}

// Създай нова задача
export async function create(taskData) {
    const result = await api.post('/tasks', taskData);
    return result.data;
}

// Вземи задача по ID
export async function getById(taskId) {
    const result = await api.get(`/tasks/${taskId}`);
    return result.data;
}

// Обнови задача
export async function update(taskId, taskData) {
    const result = await api.put(`/tasks/${taskId}`, taskData);
    return result.data;
}

// Изтрий задача
export async function remove(taskId) {
    const result = await api.delete(`/tasks/${taskId}`);
    return result.data;
}
