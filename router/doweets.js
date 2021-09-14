import express from "express";
import 'express-async-errors';
import { body } from 'express-validator';

import * as doweetController from '../controller/doweet.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateDoweet = [
    body('text')
        .trim()
        .isLength({min: 3})
        .withMessage('text should be at least 3 charactors'),
     validate
]
// GET /doweets
// GET /doweets?username=:username
router.get('/', isAuth,doweetController.getDoweets);

router.get('/:id', isAuth,doweetController.getDoweet);

router.post(
    '/',
    isAuth,
    validateDoweet
    ,doweetController.createDoweet);

router.put('/:id',isAuth,validateDoweet,doweetController.updateDoweet);

router.delete('/:id', isAuth,doweetController.deleteDoweet)

export default router;