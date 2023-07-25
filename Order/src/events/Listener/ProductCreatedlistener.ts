import  {productCreatedEvent , storeCreatedEvent , BaseListener, RoutingKeys} from '@kelvin9502/shared' ;
import { Message, Channel } from 'amqplib';
import { client } from '../../..';




export class productCreatedListener extends BaseListener<productCreatedEvent>{


     routingKey: RoutingKeys =  RoutingKeys.productCreated  ;
 


   async  OnMessage(msg: Message, channel: Channel){
          
   try {
      const data = JSON.parse(msg.content.toString());

      console.log(data);

      const query = `INSERT INTO chatsandra.PRODUCT(productid, name , description , price , storeid , createdAt ) VALUES(?,?,?,?,?,?)`;
      const params = [
        data.id,
        data.name,
        data.description,
        data.price,
        data.storeId,
        new Date(data.createdAt),
      ];

      const res = await client.execute(query, params, { prepare: true });
      console.log(res.info);
      channel.ack(msg);

   } catch (error) {
      
     throw error ;
   }
     }
 
    


}