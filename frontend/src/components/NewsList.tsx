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
        <div className="chatContainer" style={{ marginTop: '40px', paddingBottom: '60px' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Управление новостями</h2>
            
            <div className="chatPanel" style={{ padding: '20px', marginBottom: '30px' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input 
                            className="chatInput" 
                            placeholder="Заголовок новости" 
                            value={form.title} 
                            onChange={e => setForm({...form, title: e.target.value})} 
                        />
                        <input 
                            className="chatInput" 
                            placeholder="Автор" 
                            style={{ width: '30%' }}
                            value={form.author} 
                            onChange={e => setForm({...form, author: e.target.value})} 
                        />
                    </div>
                    <textarea 
                        className="chatInput" 
                        placeholder="Текст новости..." 
                        style={{ minHeight: '80px', resize: 'vertical' }}
                        value={form.content} 
                        onChange={e => setForm({...form, content: e.target.value})} 
                    />
                    <button type="submit" className="chatButton" style={{ alignSelf: 'flex-start' }}>
                        Опубликовать новость
                    </button>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '16px', textAlign: 'left' }}>
                {news.length === 0 && <p className="chatHint">Новостей пока нет...</p>}
                
                {news.map(n => (
                    <div key={n.id} className="chatMessage" style={{ maxWidth: '100%', width: '100%', margin: '0', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-h)' }}>{n.title}</h4>
                            <button 
                                onClick={() => handleDelete(n.id)} 
                                style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px' }}
                            >
                                Удалить
                            </button>
                        </div>
                        <p style={{ fontSize: '16px', marginBottom: '12px', lineHeight: '1.5' }}>{n.content}</p>
                        <div className="chatAuthor" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Автор: {n.author}</span>
                            <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};