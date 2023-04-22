import  express from "express"; 
import {isAuth} from  '@kelvin9502/shared' ; 
import  {create, getProduct, getProducts} from '@controller/index'
const Router =  express.Router(); 
 

Router.route("/create")
.post(isAuth ,create ) ;

Router.route("/")
.get(getProducts) ;


Router.route("/:id")
.get(getProduct) ;


export  {Router  as productRouter};