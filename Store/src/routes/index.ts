import express from 'express';
import  {isAuth} from '@kelvin9502/shared' ;
import { createStore } from '@controller/index';
const Router = express.Router();


Router.route("/api/stores/create")
.post(isAuth ,createStore)





export {Router as storeRouter};