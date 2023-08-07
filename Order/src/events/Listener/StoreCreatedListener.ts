import {storeCreatedEvent , BaseListener, RoutingKeys ,  } from '@kelvin9502/shared' ;
import { Message, Channel } from 'amqplib';
import  {client} from '../../../index'


export  class  StoreCreatedListener extends BaseListener<storeCreatedEvent>{
 

    routingKey: RoutingKeys.storeCreated =  RoutingKeys.storeCreated ;



    async OnMessage(msg: Message, channel: Channel){
        
   try {
     const data = JSON.parse(msg.content.toString());
console.log(data)
     const operation = `INSERT INTO chatsandra.STORE(storeid , name , userid, createdAt) VALUES(? , ? , ? ,?)`;
     const params = [data.id, data.name, data.userId, new Date(data.createdAt)];

     const res = await client.execute(operation, params, { prepare: true });

     console.log(res.info ,res);
  
     
     channel.ack(msg);
   } catch (error) {
     
    throw error
   }

    }


}