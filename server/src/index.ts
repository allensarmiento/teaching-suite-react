import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import { app } from './app';
import { postgresWrapper } from './postgres-wrapper';

const start = async () => {
  if (!process.env.POSTGRES_URI) {
    throw new Error('POSTGRES_URI must be defined');
  }

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.AGORA_APP_ID) {
    throw new Error('AGORA_APP_ID must be defined');
  }

  if (!process.env.AGORA_APP_CERTIFICATE) {
    throw new Error('AGORA_APP_CERTIFICATE must be defined');
  }

  try {
    postgresWrapper.connect(process.env.POSTGRES_URI);
    console.log('Connected to postgres');
  } catch (err) {
    console.error(err);
  }

  const server = createServer(app);
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    }
  });

  interface CurrentUser {
    id: string;
    email: string;
    role: string;
  }

  const SOCKET_LIST: { [name: string]: Socket } = {}; // TODO: Persist state in redis

  io.sockets.on('connection', (socket: Socket) => {
    socket.on('user-connected', (currentUser: CurrentUser) => {
      SOCKET_LIST[currentUser.id] = socket;
    });

    socket.on('slide-button-clicked', (slideControllerData) => {
      for (let id in SOCKET_LIST) {
        const userSocket = SOCKET_LIST[id];
        userSocket.emit('update-slides', slideControllerData);
      }
    });
  });
};

start();
