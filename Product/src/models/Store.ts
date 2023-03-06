import {Schema , model} from 'mongoose';
import  {Istore} from './models.interface'; 


const StoreSchema = new Schema<Istore>({
  name: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },

  products: [{ type: Schema.Types.ObjectId, ref: "PRODCUT" }],
  orders: [{ type: Schema.Types.ObjectId, ref: "ORDER" }],
} , 

{
    timestamps:true  , toJSON:{
        transform(doc, ret, options) {
            ret.id = ret._id ;
            delete ret.id;
        },


    }

}
    );



export const Store =  model("STORE" , StoreSchema);