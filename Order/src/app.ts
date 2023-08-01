import express  , {Request , Response }from 'express' ;
import  'express-async-errors' ;
import  {errorHandler} from '@kelvin9502/shared' ;
import { orderRoute } from './routes';
const app =  express() ;




app.use(express.json()) ;

app.get("/api/orders/655" , (req:Request , res:Response)=>{

    res.send("hello") ;
})
app.use("/api/orders" , orderRoute) ;


app.use(errorHandler) ; 

export  {app} ;