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
import sequelize from './config/database.js';  
import groupRouter from './router/groupRouter.js';
import imgRouter from './router/imgRouter.js';
import productRouter from './router/productRouter.js';

const app = express();
const port = process.env.port;
viewEngine(app);

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//config cors
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
};

//config cros
app.use(cors(corsOptions));
//cái này la gì thì không biết
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//config session
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

//cái này là gán biến username để bên ejs xài được
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  next();
});


//Router nhá mấy bé
app.use('/', router);
app.use('/api/auth', authRouter);
app.use('/sq', sqRouer);
app.use('/group',groupRouter);
app.use('/img', imgRouter);
app.use('/product', productRouter);

// connect TypeORM 
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
