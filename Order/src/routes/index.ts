import express from 'express' ;
import {createOrder, getByUser} from '../controllers/index';
import  {isAuth} from '@kelvin9502/shared'
const Router =  express.Router() ;


Router.post("/create" , isAuth , createOrder) ;
 Router.get("/getByUserId" , isAuth , getByUser)


export {Router as orderRoute }