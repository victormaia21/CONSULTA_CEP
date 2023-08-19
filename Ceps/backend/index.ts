import express, { Request, Response } from 'express';
import cors from 'cors';
import UserRoutes from './routes/UserRoutes';
import conn from './db/conn';
const connn = conn;

const app = express();

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.static('public'));
app.use(express.json());

app.use('/users',UserRoutes);

app.listen(5000);