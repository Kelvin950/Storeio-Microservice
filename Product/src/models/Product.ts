import { Schema , model } from "mongoose";
import {Iproducts} from  './models.interface'  ; 
import { updateIfCurrentPlugin } from "mongoose-update-if-current";


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
productSchema.set("versionKey" , "version") ;
productSchema.plugin(updateIfCurrentPlugin) ;


export  const Product = model("PRODUCT" , productSchema) ;

//optimistic concurrency

/*

whe have a data instance {user:"jee", namee:"ere" , version:1 , updatedAt:"3 am"} 

now we can use  either the version or the timestamp to control concurrency and persist data integrity and consistency in our db 
by using optimistic concurrency control

let say the data instance is fetched at the same time  by two diff users a and b now a updates name to"212" and b updates
name to "der" , the final state of name is "der"  which affects data integrity .
therefore we should lock the data instance as soon as and update is made so when the the 
data is fetched at the same time by this two diff users it doesnt affect our db integrity

however locking the db affects the performance of the db therefore an optimised solution is optimisitc concurrency control
   we either change the version or the timestamp of the db instance whenever the db is updated . with this the second user cannot update the instance since the versio or timestamp would have expired




*/