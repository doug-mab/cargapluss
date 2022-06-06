import { Router } from 'express';
import storageController from '../controllers/storageController';

const router = Router();

router.get('/:apiKey/storage', storageController.index);

export default router;
