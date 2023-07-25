
import {Types} from "mongoose";



export interface Iproducts{

name:string;
description:string ;
price:number ; 
version:number
image:string ;
storeId:Types.ObjectId
createdAt:string
}


export interface  Istore{
 
    name:string;
    userId:string ;

    
  
}