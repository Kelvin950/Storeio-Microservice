import express from 'express';
import  {isAuth} from '@kelvin9502/shared' ;
import { createStore, getStore, getStores } from '@controller/index';
const Router = express.Router();


Router.route("/create")
.post(isAuth ,createStore)

Router.route("/")
.get(getStores)



Router.route("/:id")
.get(getStore)


export {Router as storeRouter};