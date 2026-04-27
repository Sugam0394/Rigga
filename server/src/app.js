import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({extended : true , limit:"20kb"}))
app.use(express.static('public'))
app.use(cookieParser());


 

 


// whatsapp routes
import whatsappRouter from './Routes/whatsapp.routes.js';

app.use('/api' , whatsappRouter)

 
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

 


export default app