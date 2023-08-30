import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = parseInt(process.env.PORT || '3000');

async function startServer() {
  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
}

startServer();
