import express from 'express';
import {createUser} from '@controller/loginController'
const Route = express.Router() ; 

Route.route("/create")
.post(createUser); 



export  {Route as userRoutes}