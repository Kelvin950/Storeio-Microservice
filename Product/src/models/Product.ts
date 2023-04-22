import { Schema , model } from "mongoose";
import {Iproducts} from  './models.interface'  ; 



const productSchema =  new Schema<Iproducts>({


name:{type:String , required:true } ,
description:{type:String ,required:true} ,
price:{type:Number , required:true}, 
storeId:{type:Schema.Types.ObjectId , ref:"STORE"} ,
image:{type:String , require:true}



} , 

{
    timestamps:true  , toJSON:{
        transform(doc, ret, options) {
            ret.id = ret._id ;
            delete ret.id;
        },
    }
})




export  const Product = model("PRODUCT" , productSchema) ;