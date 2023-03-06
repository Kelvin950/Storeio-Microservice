import express ,{Request , Response} from 'express' ; 
import "express-async-errors" ; 
import {errorHandler} from '@kelvin9502/shared'
const app = express() ;

     
      

app.get("/api/products/" ,(req:Request,res:Response)=>{
    res.send("hello world")
})


app.use(errorHandler) ; 


export default app