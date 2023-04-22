import {Types} from 'mongoose'

export interface  Istore{

     name:string ; 
     userId:string ; 
    
      


}

export interface Iproducts {
  name: string;
  description: string;
  price: number;
  image: string;
  storeId: Types.ObjectId;
}
