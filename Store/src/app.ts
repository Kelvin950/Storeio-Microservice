import express  ,  {Request , Response}from 'express';
import  {errorHandler} from '@kelvin9502/shared';

const app =  express();


app.use(express.json());







app.use(errorHandler); 

export {app};