import express from 'express';
import { checkStatus } from '../controllers/healthCheckController';

const router = express.Router();

router.get('/', checkStatus);

export default router;
