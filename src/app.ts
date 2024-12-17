


import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import cookieParser from 'cookie-parser'

import errorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/Routes';

// parser
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173']}));
app.use(cookieParser())
//application routes
app.use('/api/v1',router);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!fahim');
});

// global error handler ...

app.use(errorHandler)


// not pound error handler 
app.use(notFound)



export default app;
