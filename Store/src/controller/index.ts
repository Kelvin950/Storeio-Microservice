import  {Request , Response} from "express";
import  {BadInputError, AuthError} from '@kelvin9502/shared' 
import  {Store} from '@models/Store';



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
       
   
    res.status(201).send({
        success:true , data:{
            store
        }
    })

}


