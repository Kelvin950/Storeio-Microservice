import {Schema ,model} from 'mongoose'
import { Istore } from './models.interface';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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





storeSchema.plugin(updateIfCurrentPlugin) ;
storeSchema.set('versionKey' , 'version') ;



export const Store=  model("Store" , storeSchema);