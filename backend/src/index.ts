import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { env } from './env'
import { registerChatHandlers } from './socket/chatSocket'
import { newsService } from './newsService';
import { authMiddleware } from './middleware/authMiddleware';

const app = express()

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
  }),
)
app.use(express.json())

app.get('/api/news', (_req, res) => {
  res.json(newsService.getAll());
});

app.post('/api/news', authMiddleware, (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  const news = newsService.create({ title, content, author });
  res.status(201).json(news);
});

app.delete('/api/news/:id', authMiddleware, (req, res) => {
  const success = newsService.delete(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Новость не найдена' });
  }
});

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: env.SOCKET_MAX_HTTP_BUFFER * 1024 * 1024,
})

registerChatHandlers(io)

httpServer.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен: http://localhost:${env.PORT}`)
})

