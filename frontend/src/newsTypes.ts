export interface News {
    id: string;
    title: string;
    content: string;
    author: string;
    createdAt: number;
}

export type CreateNewsDto = Omit<News, 'id' | 'createdAt'>;