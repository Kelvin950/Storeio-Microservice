import express ,{Request , Response} from 'express' ; 
import "express-async-errors" ; 
import {errorHandler} from '@kelvin9502/shared' ;
import {productRouter} from '@routes/index'
const app = express() ;

app.use(express.json());
      




app.use("/api/products" , productRouter);
app.use(errorHandler) ; 


export default app