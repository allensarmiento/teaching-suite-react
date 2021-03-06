import cors from 'cors';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { NotFoundError } from './errors/not-found-error';

import { currentUser } from './middlewares/current-user';
import { errorHandler } from './middlewares/error-handler';

import { currentUserRouter } from './routes/auth/current-user';
import { signinRouter} from './routes/auth/signin';
import { signoutRouter } from './routes/auth/signout';
import { signupRouter } from './routes/auth/signup';

import { createLessonRouter } from './routes/lessons/new';
import { indexLessonRouter } from './routes/lessons/index';
import { showLessonRouter } from './routes/lessons/show';

import { accessTokenRouter } from './routes/video-call/access-token';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true,
  alllowedHeaders: 'Content-Type, Authorization, X-Requested-With',
};
app.use(cors(corsOptions));

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
      && process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
  }),
);
app.use(currentUser);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(createLessonRouter);
app.use(indexLessonRouter);
app.use(showLessonRouter);

app.use(accessTokenRouter);

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
