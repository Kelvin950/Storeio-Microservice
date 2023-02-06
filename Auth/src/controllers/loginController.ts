import {Request ,Response} from 'express';
import User from '@models/User';
import BadInputError from '@middlewares/BadInputError';
import jwt from 'jsonwebtoken';

export const createUser = async (req:Request , res:Response)=>{
 
    
const {name ,password} = req.body ; 

if(name === ''|| password ==''){

     throw  new BadInputError("email or password cannot be empty" , 400);

}
 

const user = await  User.create({name , password});



 await user.save(); 

  
 const token =  jwt.sign( {id:user.id , email:user.name}, process.env.JWT_SECRET! ,{expiresIn:"1hr"} ); 

 res.cookie("me" , name , {
   httpOnly:true ,signed:true 
 }) ;
 res.status(200).send({
    success:true , 
    data:{user  , token}
 });
 


}