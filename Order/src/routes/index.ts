import express from 'express' ;
import {createOrder} from '../controllers/index';
import  {isAuth} from '@kelvin9502/shared'
const Router =  express.Router() ;


Router.post("/create" , isAuth , createOrder) ;




export {Router as orderRoute }