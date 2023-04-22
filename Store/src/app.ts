import express  ,  {Request , Response}from 'express';
import  "express-async-errors"
import {storeRouter} from '@routes/index'
import  {errorHandler} from '@kelvin9502/shared';

const app =  express();


app.use(express.json());


app.use("/api/stores" ,storeRouter);



app.use(errorHandler); 

export {app};