import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import router from './modules/routes';

const app = express();
app.use(cookieParser());

// middleware parser
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use('/api', router);

// routes
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'BookBazaar is Running Server',
  });
});

// middleware
app.use(globalErrorHandler);

app.use(notFound);

export default app;
