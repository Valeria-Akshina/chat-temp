import { randomUUID } from 'crypto';
import { News, CreateNewsDto } from './newsTypes';

const newsStore: News[] = [];

export const newsService = {
    getAll: (): News[] => {
        return newsStore;
    },

    create: (data: CreateNewsDto): News => {
        const newNews: News = {
        id: randomUUID(),
        createdAt: Date.now(),
        ...data,
        };
        newsStore.push(newNews);
        return newNews;
    },

    delete: (id: string): boolean => {
        const index = newsStore.findIndex((n) => n.id === id);
        if (index !== -1) {
        newsStore.splice(index, 1);
        return true;
        }
        return false;
    }
};