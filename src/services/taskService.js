import { api } from "./api.js";

export async function getAll() {
    const result = await api.get('/tasks');

    return result.data;
}

export async function create(taskData) {
    const result = await api.post('/tasks', taskData);

    return result.data;
}

export async function getById(taskId) {
    const result = await api.get(`/tasks/${taskId}`);

    return result.data;
}