import express  ,  {Response , Request}from 'express';
import "express-async-errors";
import cookie from 'cookie-parser';
import {errorHandler} from '@kelvin9502/shared'
import 'dotenv/config' ; 
import helmet from 'helmet';
import {userRoutes} from "./routes/userRoutes"
const app =  express();

app.use(express.json());
app.use(cookie(process.env.SECRET! )) ; 


app.get("/api/users/" , (req:Request,res:Response)=>{

    res.send("hool")
})

app.use("/api/users" , userRoutes)


app.use(errorHandler);

export default app;