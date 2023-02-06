import express from 'express';
import "express-async-errors";
import cookie from 'cookie-parser';
import {errorHandler} from '@kelvin9502/shared'
import 'dotenv/config' ; 
import helmet from 'helmet';
import {userRoutes} from "@route/userRoutes"
const app =  express();

app.use(helmet());
app.use(express.json());
app.use(cookie(process.env.SECRET!)) ; 


app.use(userRoutes)


app.use(errorHandler);

export default app;