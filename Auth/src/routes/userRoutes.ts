import express from 'express';
import {createUser} from '@controller/loginController'
const Route = express.Router() ; 

Route.route("/auth/refreshToken")
.get() ;


Route.route("/auth/create")
.post(createUser); 



export  {Route as userRoutes}