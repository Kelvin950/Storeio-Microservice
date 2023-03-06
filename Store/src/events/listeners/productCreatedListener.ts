import {RoutingKeys , BaseListener , productCreatedEvent} from '@kelvin9502/shared';
import { Message, Channel } from 'amqplib';


export class productCreatedListener extends BaseListener<productCreatedEvent>{
   

 async    OnMessage(msg: Message, channel: Channel){
         console.log(msg.content.toString())

    }

    routingKey: RoutingKeys.productCreated =  RoutingKeys.productCreated;
 

 


}