import express, { Request, Response, NextFunction } from 'express';
import healthCheckRoutes from './routes/healthCheckRoutes';
import messagesRoutes from './routes/messagesRoutes';
import usersRoutes from './routes/usersRoutes';
import channelRoutes from './routes/channelsRoutes';
import { CustomError, globalErrorHandler } from './middlewares/globalErrorHandler';
import { authenticateRequest } from './middlewares/authenticateRequest';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/health-check', authenticateRequest, healthCheckRoutes);
app.use('/api/messages', messagesRoutes); //TODO: add authenticateRequest
app.use('/api/users', usersRoutes); //TODO: add authenticateRequest
app.use('/api/channels', authenticateRequest, channelRoutes);
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(`Route ${req.originalUrl} not found!!!`, 404);
  next(error);
});

app.use(globalErrorHandler);

export { app };
