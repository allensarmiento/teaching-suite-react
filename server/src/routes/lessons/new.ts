import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';

import { lesson } from '../../models/lesson';

const router = express.Router();

router.post(
  '/api/lessons',
  requireAuth,
  [
    body('title')
      .trim()
      .isLength({ min: 4, max: 100 })
      .withMessage('Title must be between 4 and 100 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const newLesson = await lesson.build({
      userId: req.currentUser!.id,
      title,
    });

    res.status(201).send(newLesson);
  },
);

export { router as createLessonRouter };
