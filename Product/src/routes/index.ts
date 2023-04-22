import  express from "express"; 
import {isAuth} from  '@kelvin9502/shared' ; 
import  {create, getProduct, getProducts , getStoreProducts} from '@controller/index'
const Router =  express.Router(); 
 

Router.route("/create")
.post(isAuth ,create ) ;

Router.route("/")
.get(getProducts) ;


Router.route("/:id")
.get(getProduct) ;

Router.route("/store/:storeId/products")
.get(getStoreProducts)

export  {Router  as productRouter};