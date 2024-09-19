import express from 'express';
import dotenv from 'dotenv/config'
import myDateTime from './date';
import  {getParamsURL} from './getURL';
import viewEngine from './viewEJS';

const app = express()
const port = process.env.port
viewEngine(app)

// app.get('/about', (req,res ) =>{
//     res.send('hello word!.page about')
// })

app.get('/date', (req, res) =>{
    res.send(myDateTime())
})

app.get('/getURL', (req, res) => {
    res.send(getParamsURL(req))
})

app.get('/test', (req,res) =>{
    res.render("test")
})
app.get('/', (req,res) =>{
    res.render("home")
})
app.get('/about', (req,res) =>{
    res.render("about")
})


app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`);
})
