import express from 'express';
import dotenv from 'dotenv/config';
import myDateTime from './date';
import { getParamsURL } from './getURL';
import viewEngine from './views/viewEJS';
import router from './router/webRouter';
import bodyParser from 'body-parser';
import authRouter from './router/authRouter';
import sqRouer from './router/SQUserRouter.js'
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sequelize from './config/database.js';  // Import Sequelize 

const app = express();
const port = process.env.port;
viewEngine(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_NAME_COOKIE,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use('/', router);
app.use('/api/auth', authRouter);
app.use('/sq', sqRouer);

// Kết nối cơ sở dữ liệu và chạy server
sequelize
  .sync()  
  .then(() => {
    app.listen(port, () => {
      console.log(`HÔ hô Nemo app listening on port ${port}`);
      console.log('Database connected and synchronized');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
