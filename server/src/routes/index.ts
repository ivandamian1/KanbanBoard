import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
router.get('/tasks', authenticateToken, (_, res) => {
    // Fetch and return tasks from DB
    res.send({ tasks: [] });
});

router.use('/api', apiRoutes);

export default router;
