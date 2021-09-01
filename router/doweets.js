import express from "express";
import 'express-async-errors';

import * as doweetController from '../controller/doweet.js';

const router = express.Router();

// GET /doweets
// GET /doweets?username=:username
router.get('/', doweetController.getDoweets);

router.get('/:id', doweetController.getDoweet);

router.post('/',doweetController.createDoweet);

router.put('/:id',doweetController.updateDoweet);

router.delete('/:id', doweetController.deleteDoweet)

export default router;