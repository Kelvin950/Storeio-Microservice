import express  ,  {Request , Response}from 'express';
import  {errorHandler} from '@kelvin9502/shared'
const app =  express();


app.use(express.json());


app.use("/" ,  (req:Request,res:Response)=>{
 

    res.send("Hello world")
    
})




app.use(errorHandler); 

export {app};