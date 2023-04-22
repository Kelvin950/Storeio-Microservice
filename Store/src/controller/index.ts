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



export const getStores=  async(req:Request , res:Response)=>{

  
    const stores=  await Store.find() ;


    res.send({
        success:true , data:{
            stores
        }
    })


}


export const getStore =  async(req:Request , res:Response)=>{

    const store = await Store.findById(req.params.id) ;

    if(!store){
        
        throw new BadInputError("Bad request" , 400)
    }


    res.send({
        sucess:true , data:{
            store
        }
    })
}


export const fetchuserStore=  async(req:Request ,res:Response)=>{

 
    const store= await  Store.findOne({userId:req.user?.id}) ;

    if(!store) {
        
        throw new BadInputError("Bad request error", 400) ;
    }



    res.send({
        success:true  ,data:{
            store
        }
    })
    

}