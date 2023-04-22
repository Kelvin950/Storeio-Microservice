import {Schema ,model} from 'mongoose'
import { Istore } from './models.interface';


const storeSchema = new Schema<Istore>({
  name: { type: String, unique: true, required: true },
  userId: { type: String, unique: true, required: true },
  

  
  
  

} , {
    timestamps:true ,toJSON:{
        transform(doc, ret, options) {
             ret.id =  ret._id ;
             delete ret._id 
        },
    }
}); 









export const Store=  model("Store" , storeSchema);