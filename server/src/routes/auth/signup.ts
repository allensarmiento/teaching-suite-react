import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { user } from '../../models/user';

const router = express.Router();

router.post(
  '/api/auth/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await user.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // Create new user
    const newUser = await user.build(email, password);
    if (!newUser) {
      throw new BadRequestError('Could not register user');
    }

    // Remove password
    delete newUser.password;

    res.status(201).send(newUser);
  },
);

export { router as signupRouter };
