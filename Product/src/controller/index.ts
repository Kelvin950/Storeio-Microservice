import {Product} from '@models/Product' ;
import {Store} from '@models/Store'
import {Request , Response} from 'express';
import {BadInputError} from '@kelvin9502/shared';
import { productCreatedPublsiher } from '@events/Publisher/ProductCreatedEvent';
import { AMQPwrapper } from '../../AMQP';

export const create = async (req:Request , res:Response)=>{
       
    const {storeId} = req.params

   
    const store =  await Store.findById(storeId); 
 
    if(!store){
    
        throw new  BadInputError("store not available" ,400);

    } 


     const  {name ,description , price }  =  req.body ; 

      
     const productAlreadyExist =    await Product.findOne({name  , storeId}) ; 
 

     console.log(productAlreadyExist)
     if(productAlreadyExist){
        throw new BadInputError("product already exist" , 400); 

     } 


    const product = new Product({
        name , description , price: +price , storeId  
    })  ;
      
      

    await product.save() ; 
 
    store.products.push(product);
    await store.save();

    await new productCreatedPublsiher(AMQPwrapper.Channel!).Publish({
        id:product._id.toString() , 
        name:product.name ,
        storeId:product.storeId.toString() ,
        price: product.price ,
        description:product.description
    })

    res.status(201).send({
        succes:true ,
        data:{
            product
        }
    })

 
  
 

}