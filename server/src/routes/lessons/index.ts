import express, { Request, Response } from 'express';

import { lesson } from '../../models/lesson';

import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get('/api/lessons', requireAuth, async (req: Request, res: Response) => {
  const lessons = await lesson.find();

  res.send(lessons);
});

export { router as indexLessonRouter };
