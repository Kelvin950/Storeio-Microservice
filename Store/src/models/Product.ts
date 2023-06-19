import { HydratedDocument, Model, Schema, model } from "mongoose";
import { Iproducts } from "./models.interface";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";




interface productModel extends Model<Iproducts>{
  
   findProduct(data:{id:string, version:number}):  Promise<HydratedDocument<Iproducts>>

}
const productSchema = new Schema<Iproducts , productModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    storeId: { type: Schema.Types.ObjectId, ref: "STORE" },
    image: { type: String},
  },
 
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;
        delete ret.id;
      },
    },
  }
);
//

productSchema.static(
  "findProduct",
  function findProduct(data: { id: string; version: number }) {
     
    return  this.findOne({_id:data.id ,version:data.version-1})

  }
);

//@ts-ignore
productSchema.plugin(updateIfCurrentPlugin)
productSchema.set("versionKey" , "version")
export const Product = model<Iproducts , productModel>("PRODUCT", productSchema);
