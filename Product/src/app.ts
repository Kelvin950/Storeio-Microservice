import express ,{Request , Response} from 'express' ; 
import "express-async-errors" ; 
import {errorHandler} from '@kelvin9502/shared' ;
import {productRouter} from '@routes/index'
const app = express() ;

app.use(express.json());
      

app.get("/api/products/" ,(req:Request,res:Response)=>{
    res.send("hello world")
})


app.use(productRouter);
app.use(errorHandler) ; 


export default app