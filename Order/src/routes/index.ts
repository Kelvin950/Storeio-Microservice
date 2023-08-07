import express from 'express' ;
import {createOrder, fetchByStoreId, getByUser ,getProductsByOrderid} from '../controllers/index';
import  {isAuth} from '@kelvin9502/shared'
const Router =  express.Router() ;


Router.post("/create" , isAuth , createOrder) ;
 Router.get("/getByUserId" , isAuth , getByUser)
Router.get("/getByOrderid/:id" ,isAuth , getProductsByOrderid)
Router.get("/getByStoreId/:id" , isAuth , fetchByStoreId)
export {Router as orderRoute }