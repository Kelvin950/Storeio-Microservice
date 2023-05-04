import  {BadInputError, BaseListener, RoutingKeys , productCreatedEvent, productUpdatedEvent} from  '@kelvin9502/shared' ; 
import { Product } from '@models/Product';
import { Message, Channel } from 'amqplib';
import { buffer } from 'stream/consumers';


export class ProductUpdatedListener extends BaseListener<productUpdatedEvent>{

 
    routingKey: RoutingKeys.productUpdated = RoutingKeys.productUpdated ; 

    async OnMessage(msg: Message, channel: Channel) {
   
        console.log(msg.content.toString()) ;
       const data:productCreatedEvent["msg"]=  JSON.parse(msg.content.toString()) ;
        
      try {
         const product = await Product.findProduct({
           id: data.id!,
           version: data.version,
         });

         if (!product) {
           throw new BadInputError("Bad request ", 400);
         }

         product.description = data.description;
         product.name = data.name;
         product.price = data.price;

         await product.save();

         channel.ack(msg);
      } catch (error) {
         
        console.log(error)
      }
    }

}