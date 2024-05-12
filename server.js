const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const dbConnect = require('./config/dbConnect');
const { swaggerDocs, options } = require('./config/swaggerConfig');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 4000;
dbConnect();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

// Not Found
app.use((req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: err?.stack.replace(/^Error: /, ''),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`);
});
