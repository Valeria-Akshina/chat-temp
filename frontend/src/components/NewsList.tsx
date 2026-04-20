import React, { useEffect, useState } from 'react';
import { newsApi } from '../newsApi';
import type { News } from '../newsTypes';

export const NewsList: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    const [form, setForm] = useState({ title: '', content: '', author: '' });

    const AUTH_TOKEN = 'my-secret-token';

    const load = async () => {
        try { setNews(await newsApi.getAll()); } 
        catch (e) { console.error(e); }
    };

    useEffect(() => { load(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        await newsApi.create(form, AUTH_TOKEN);
        setForm({ title: '', content: '', author: '' });
        load();
        } catch (e: any) { alert(e.message); }
    };

    const handleDelete = async (id: string) => {
        try {
        await newsApi.delete(id, AUTH_TOKEN);
        load();
        } catch (e: any) { alert(e.message); }
    };

    return (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px', color: '#333' }}>
        <h3>Управление Новостями (CRUD)</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Заголовок" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input placeholder="Автор" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
            <textarea placeholder="Текст новости" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
            <button type="submit" style={{ cursor: 'pointer' }}>Опубликовать</button>
        </form>

        <hr />

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {news.map(n => (
            <div key={n.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                <h4 style={{ margin: '0' }}>{n.title}</h4>
                <p style={{ fontSize: '14px' }}>{n.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <small>Автор: {n.author}</small>
                <button onClick={() => handleDelete(n.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Удалить</button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};