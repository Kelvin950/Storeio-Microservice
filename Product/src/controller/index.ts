import {Product} from '@models/Product' ;
import {Store} from '@models/Store'
import {Request , Response} from 'express';
import {BadInputError} from '@kelvin9502/shared'
export const create = async (req:Request , res:Response)=>{
       
    const {storeId} = req.params

   
    const store =  await Store.findById(storeId); 
 
    if(!store){
    
        throw new  BadInputError("store not available" ,400);

    } 


     const  {name ,description , price }  =  req.body ; 

      
     const productAlreadyExist =    await Store.findOne({name  , storeId}) ; 

     if(productAlreadyExist){
        throw new BadInputError("product already exist" , 400); 

     } 


    const product = new Product({
        name , description , price: +price , storeId  
    })  ;
      
      

    await product.save() ; 


    res.status(201).send({
        succes:true ,
        data:{
            product
        }
    })

 
  
 

}