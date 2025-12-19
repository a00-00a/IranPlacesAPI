import express from 'express';
import cors from 'cors';
import provinceRoutes from './routes/provinceRoutes';
import cityRoutes from './routes/cityRoutes';
import globalErrorHandler from './controllers/errorController';
import AppError from './utils/appError';

const app = express();

app.use(cors({ origin: '*' }));

// Routes
app.use('/api/provinces', provinceRoutes);
app.use('/api/cities', cityRoutes);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
