import express  ,  {Request , Response}from 'express';
import  "express-async-errors"
import {storeRouter} from '@routes/index'
import  {errorHandler} from '@kelvin9502/shared';

const app =  express();


app.use(express.json());

app.get("/api/stores/", (req:Request , res:Response)=>{
    res.send("goo")
})

app.use(storeRouter);



app.use(errorHandler); 

export {app};