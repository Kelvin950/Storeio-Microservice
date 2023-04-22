import  {BaseListener , RoutingKeys , storeCreatedEvent } from '@kelvin9502/shared';
import { Message, Channel } from 'amqplib';
import  {Store} from '@models/Store'
import { storeCreated } from './listener.interface';
export class StoreCreatedListener  extends  BaseListener<storeCreatedEvent>{


    async OnMessage(msg: Message, channel: Channel) {
         
              const data:storeCreated =  JSON.parse(msg.content.toString());
              console.log(data)
        const store=  await new Store({
                     
             _id: data.id ,
             userId: data.userId ,
             name: data.name
               
        })   


         await store.save();

         channel.ack(msg) ;
        
     }
    routingKey: RoutingKeys.storeCreated =  RoutingKeys.storeCreated; 

}