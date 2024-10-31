import express from 'express';
import dotenv from 'dotenv/config'
import myDateTime from './date';
import  {getParamsURL} from './getURL';
import viewEngine from './views/viewEJS';
import router from './router/webRouter';
import bodyParser from 'body-parser';
import userRouter from './router/userRouter';
import session from 'express-session';



const app = express()
const port = process.env.port
viewEngine(app)

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    }))

// app.get('/about', (req,res ) =>{
//     res.send('hello word!.page about')
// })
// app.use(express.static('public'));
// app.get('/date', (req, res) =>{
//     res.send(myDateTime())
// })

// app.get('/getURL', (req, res) => {
//     res.send(getParamsURL(req))
// })

// app.get('/test', (req,res) =>{
//     res.render("test")
// })
// app.get('/home', (req,res) =>{
//     res.render("home")
// })
// app.get('/about', (req,res) =>{
//     res.render("about")
// })

// app.get('/', (req,res) =>{
//     res.render("main")
// })



app.use(express.urlencoded({ extended: true }));

app.use('/',router);

app.listen(port, ()=>{
    console.log(`HÔ hô Nemo app listening on port ${port}`);
})
