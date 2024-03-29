import {Request ,Response} from 'express';
import User from '../Models/User';
import {BadInputError , AuthError , Payload} from "@kelvin9502/shared";
import jwt from 'jsonwebtoken';
import  {Publisher} from '../../Publisher';

import {AMQP} from '../../amqplibWrapper'
import { compare } from 'bcryptjs';
import { config } from '../../config';

export const isAuth = async(req:Request , res:Response)=>{

       
  const {refreshToken} = req.signedCookies ;


  if(!refreshToken){

   throw new AuthError("You are not authenticated" , 403);
  }


  let payload:Payload ;
   
try {
   payload = jwt.verify(refreshToken, config.JWT_SECRET) as Payload; 
} catch (error) {
   
  throw new AuthError("You are not authenticated", 403)
}

        

  

 
   const user = await User.findById(payload.id);

   if(!user){
    
   throw new AuthError("User not found", 401);
   }

 
   let access_token = jwt.sign({id:user.id ,name:user.name}, config.JWT_SECRET, { expiresIn: "1hr" }); 

  res.status(200).send({success:true , data:{
    access_token
  }});


   

}

export const login = async(req:Request ,res:Response)=>{

  const  {name, password} =req.body ;


if (name === "" || password == "") {
  throw new BadInputError("email or password cannot be empty", 400);
}



const user =  await User.findOne({name}) ;



if(!user){
  throw new AuthError("name or password incorrect" , 401);
}
console.log(user)
const isValid =  await compare(password , user.password) ;

if(!isValid){
  throw new AuthError("name or password incorrect", 401);
}

 const refreshtoken = jwt.sign(
   { id: user.id, email: user.name },
 config.JWT_SECRET,
   { expiresIn: "7d" }
 );

 const accessToken = jwt.sign(
   { id: user.id, email: user.name },
 config.JWT_SECRET,
   { expiresIn: "1hr" }
 );



  res.cookie("refreshToken", refreshtoken, {
    httpOnly: true,
    signed: true,
  });
  res.status(200).send({
    success: true,
    data: { user, accessToken },
  });
 
}



export const createUser = async (req:Request , res:Response)=>{
 
const {name ,password} = req.body ; 

if(name === ''|| password ==''){

     throw  new BadInputError("email or password cannot be empty" , 400);

}
 

const user = await  User.create({name , password});



 await user.save(); 


 
      
 const refreshtoken =  jwt.sign( {id:user.id , email:user.name}, config.JWT_SECRET ,{expiresIn:"7d"} ); 

 const accessToken  = jwt.sign({id:user.id , email:user.name}  , config.JWT_SECRET , {expiresIn:"1hr"});

 res.cookie("refreshToken" , refreshtoken , {
   httpOnly:true ,signed:true 
 }) ;
 res.status(200).send({
    success:true , 
    data:{user  , accessToken}
 });
 


}