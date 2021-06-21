import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import questionRoutes from '../routes/question.rutes';
import authRoutes from '../routes/auth.rutes';
import usersRoutes from '../routes/user.routes';
import { createRoles, createUsers, questions } from '../libs/initialSetup';
import './db.js';

createRoles();
createUsers();
questions();
const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

app.use('/api/question', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center">FINAL PROJECT REST API</h1>');
});

export default app;
