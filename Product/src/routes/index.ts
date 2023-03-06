import  express from "express"; 
import {isAuth} from  '@kelvin9502/shared' ; 
import  {create} from '@controller/index'
const Router =  express.Router(); 
 

Router.route("/api/products/create/:storeId")
.post(isAuth ,create ) ;




export  {Router  as productRouter};