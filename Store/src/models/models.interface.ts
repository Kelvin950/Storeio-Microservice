import {Types} from 'mongoose'

export interface  Istore{

     name:string ; 
     userId:string ; 
    product:Types.DocumentArray<Types.ObjectId> ; 
    orders: Types.DocumentArray<Types.ObjectId>; 
      


}