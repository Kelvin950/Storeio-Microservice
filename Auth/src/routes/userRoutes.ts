import express from 'express';
import {createUser,isAuth} from '../controllers/loginController';

const Route = express.Router() ; 

Route.get("/api/users/refreshToken" , isAuth)


Route.route("/api/users/create")
.post(createUser); 



export  {Route as userRoutes}