import express from 'express';
import  {isAuth} from '@kelvin9502/shared' ;
import { createStore, fetchuserStore, getStore, getStores } from '@controller/index';
const Router = express.Router();


Router.route("/create")
.post(isAuth ,createStore)

Router.route("/")
.get(getStores)

Router.route("/fetchuserStore").get(isAuth ,fetchuserStore);


Router.route("/:id")
.get(getStore)





export {Router as storeRouter};