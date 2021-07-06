import express, { Request, Response } from 'express';

import { postgresWrapper } from '../../postgres-wrapper';

import { NotFoundError } from '../../errors/not-found-error';

import { requireAuth } from '../../middlewares/require-auth';

const router = express.Router();

router.get(
  '/api/lessons/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    let slides: Array<any> = [];

    try {
      slides = await postgresWrapper.db
        .select([
          'l.title',
          's.number as slide_number',
          's.show_review',
          'i.number as item_number',
          'i.content',
          'i.component',
        ])
        .from('lessons as l')
        .innerJoin('slides as s', 's.lesson_id', '=', 'l.id')
        .innerJoin('items as i', 'i.slide_id', '=', 's.id')
        .where('l.id', id)
        .orderBy(['s.number', 'i.number']);
    } catch (err) {
      console.log(err);
    }

    if (slides.length === 0) {
      throw new NotFoundError();
    }

    res.send(slides);
  },
);

export { router as showLessonRouter };
