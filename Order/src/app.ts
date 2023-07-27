import express from 'express' ;
import  'express-async-errors' ;
import  {errorHandler} from '@kelvin9502/shared' ;
import { orderRoute } from './routes';
const app =  express() ;




app.use(express.json()) ;


app.use("/api/order/" , orderRoute) ;


app.use(errorHandler) ; 

export  {app} ;