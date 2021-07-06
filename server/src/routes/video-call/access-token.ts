import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { noCache } from '../../middlewares/no-cache';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';

import { AgoraVideo } from '../../services/agora-video';

const router = express.Router();

router.post(
  '/api/video-call/access-token',
  requireAuth,
  noCache,
  [
    body('channelName').trim().notEmpty(),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { channelName, uid, role, expireTime } = req.body;

    const token = AgoraVideo.generateAccessToken(
      channelName,
      uid,
      role,
      expireTime,
    );

    res.status(201).send(token);
  },
);

export { router as accessTokenRouter };
