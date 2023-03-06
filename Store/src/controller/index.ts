import  {Request , Response} from "express";
import  {BadInputError, AuthError} from '@kelvin9502/shared' 
import  {Store} from '@models/Store';
import {StoreCreatedPublisher} from '@events/publishers/StoreCreatedPublisher' ;
import {AmqplibWrapper} from '../../AMQPwrapper'

export const createStore = async (req:Request , res:Response)=>{

    const {name}= req.body ;
  
    const userOwnStore = await Store.findOne({userId:req.user?.id}) 

    if(userOwnStore){
        throw new AuthError("You already own a store" , 401);
    }

    const nameNotAvailable=  await  Store.findOne({name}) ;
    if(nameNotAvailable){

            throw new BadInputError("name not available", 401);        
    }
  
     
    
    const store=  new Store({
        name ,
        userId:req.user?.id
    })
     
    
    await  store.save(); 
       

    await new StoreCreatedPublisher(AmqplibWrapper.channel).Publish(store)
   
    res.status(201).send({
        success:true , data:{
            store
        }
    })

}


