import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da aplicação
app.use('/api', routes);

// Middleware para erro 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

export default app;
