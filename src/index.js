import dotenv from 'dotenv';
import express from 'express';
import dayjs from 'dayjs';
import axiosRetry from 'axios-retry';
import axios from 'axios';
import cors from 'cors';

import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';

import { initMongoose } from './models/init';
import authRoutes from './routes/auth.routes';
import testRoutes from './routes/test.routes';
import userRoutes from './routes/user.routes';
import utilRoutes from './routes/util.routes';
import graphicsRoutes from './routes/graphics.routes';
import recommendationsRoutes from './routes/recommendations.routes';

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

dotenv.config();

axiosRetry(axios, {
  retries: 3,
  retryDelay: () => 2000,
  shouldResetTimeout: true
});

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3001'],
    optionsSuccessStatus: 200
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/user', userRoutes);
app.use('/api/util', utilRoutes);
app.use('/api/graphics', graphicsRoutes);
app.use('/api/recommendations', recommendationsRoutes);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

app.listen(3000);

initMongoose();

export default app;
