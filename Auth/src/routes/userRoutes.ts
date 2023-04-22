import express from 'express';
import {createUser,isAuth, login} from '../controllers/loginController';

const Route = express.Router() ; 

Route.get("/refreshToken" , isAuth)


Route.route("/create")
.post(createUser); 

Route.route("/login").post(login);

export  {Route as userRoutes}