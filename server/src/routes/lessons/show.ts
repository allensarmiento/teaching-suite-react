import express, { Request, Response } from 'express';

import { postgresWrapper } from '../../postgres-wrapper';

import { NotFoundError } from '../../errors/not-found-error';

import { requireAuth } from '../../middlewares/require-auth';

import { lesson } from '../../models/lesson';

const router = express.Router();

router.get(
  '/api/lessons/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const foundLesson = await lesson.findById(id);

    if (!foundLesson) {
      throw new NotFoundError();
    }

    let slides: Array<any> = [];
    try {
      slides = await postgresWrapper.db('lessons as l')
        .innerJoin('slides as s', 's.lesson_id', 'l.id')
        .innerJoin('items as i', 'i.slide_id', 's.id')
        .where('l.id', id);
    } catch (err) {
      console.log(err);
    }

    res.send(slides);
  },
);

export { router as showLessonRouter };
