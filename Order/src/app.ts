import express from 'express' ;
import  'express-async-errors' ;
import  {errorHandler} from '@kelvin9502/shared'
const app =  express() ;




app.use(express.json()) ;



app.use(errorHandler) ; 

export  {app} ;