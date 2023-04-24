import {Product} from './Product' ; 
import mongoose from 'mongoose' ; 







(async()=>{


    const conn = await mongoose.connect(
      ""
    ); ; 


const detch1 =  await Product.findById("6444520a457718722297ec23") 
const detch2 = await Product.findById("6444520a457718722297ec23");


detch1!.price = 5 ; 

await detch1!.save() ; 

detch2!.price=4 ; 

await detch2!.save() ; 


console.log(detch1 , detch2) ;
const detch3 = await Product.findById("6444520a457718722297ec23");

console.log(detch3)
})()