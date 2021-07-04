import { app } from './app';
import { postgresWrapper } from './postgres-wrapper';

const start = async () => {
  if (!process.env.POSTGRES_URI) {
    throw new Error('POSTGRES_URI must be defined');
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    postgresWrapper.connect(process.env.POSTGRES_URI);
    console.log('Connected to postgres');
  } catch (err) {
    console.error(err);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();
