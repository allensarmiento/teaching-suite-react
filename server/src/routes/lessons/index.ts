import express, { Request, Response } from 'express';

import { requireAuth } from '../../middlewares/require-auth';

import { postgresWrapper } from '../../postgres-wrapper';

const router = express.Router();

router.get(
  '/api/lessons',
  requireAuth,
  async (req: Request, res: Response) => {
    let lessons: Array<any> = [];

    try {
      lessons = await postgresWrapper.db
        .select('*')
        .from('lessons as l')
        .orderBy([{ column: 'l.id', order: 'desc' }]);
    } catch (err) {
      console.log(err);
    }

    res.send(lessons);
  },
);

export { router as indexLessonRouter };
