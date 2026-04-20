import type { News, CreateNewsDto } from './newsTypes';

const API_BASE_URL = 'http://localhost:3002/api';

export const newsApi = {

    async getAll(): Promise<News[]> {
        const res = await fetch(`${API_BASE_URL}/news`);
        if (!res.ok) throw new Error('Ошибка загрузки');
        return res.json();
    },

    async create(dto: CreateNewsDto, token: string): Promise<News> {
        const res = await fetch(`${API_BASE_URL}/news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(dto),
        });
        if (!res.ok) throw new Error('Ошибка создания (проверьте токен)');
        return res.json();
    },

    async delete(id: string, token: string): Promise<void> {
        const res = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token },
        });
        if (!res.ok) throw new Error('Ошибка удаления');
    }
};