import  {productCreatedEvent , storeCreatedEvent , BaseListener, RoutingKeys} from '@kelvin9502/shared' ;
import { Message, Channel } from 'amqplib';




export class productCreatedListener extends BaseListener<productCreatedEvent>{


     routingKey: RoutingKeys =  RoutingKeys.productCreated  ;
 


   async  OnMessage(msg: Message, channel: Channel){
          
    const data =  msg.content.toString() ;


    console.log(data) ;

    channel.ack(msg) ;

     }
 
    


}