import {Product} from '@models/Product' ;
import {Store} from '@models/Store'
import {Request , Response} from 'express';
import {BadInputError} from '@kelvin9502/shared';
import { productCreatedPublsiher } from '@events/Publisher/ProductCreatedEvent';
import { AMQPwrapper } from '../../AMQP';

export const create = async (req:Request , res:Response)=>{
   

   
    const store =  await Store.findOne({userId:req.user?.id}) ; 
    if(!store){
    
        throw new  BadInputError("store not available" ,400);

    } 


     const  {name ,description , price }  =  req.body ; 

      
     const productAlreadyExist =    await Product.findOne({name  , StoreId: store.id}) ; 
 

     console.log(productAlreadyExist)
     if(productAlreadyExist){
        throw new BadInputError("product already exist" , 400); 

     } 


    const product = new Product({
        name , description , price: +price , storeId:store.id
    })  ;
      
      

    await product.save() ; 
 


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


export const getProducts=  async(req:Request, res:Response)=>{


    const products=  await Product.find() ; 

    res.send({
        success:true ,data:{
            products 
        }
    })
}


export const getProduct =  async (req:Request ,res:Response)=>{

    const product = await Product.findById(req.params.id) ;


    if(!product){

        throw new BadInputError("bad input error" , 400)
    }
    res.send({
        success:true , data:{

        product
        }
    })


}



export const getStoreProducts =  async(req:Request ,res:Response)=>{

    const products =  await Product.find({storeId:req.params.storeId})
  

    res.send({
        products
    })


}