import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cookieParser());

// middleware parser
app.use(express.json());

app.use(cors());

// routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'BookBazaar is Running Server',
  });
});

export default app;
