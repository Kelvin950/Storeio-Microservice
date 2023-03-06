import  {BaseListener , RoutingKeys , storeCreatedEvent} from '@kelvin9502/shared' ; 
import { Message, Channel } from 'amqplib';


export class StoreCreatedListener  extends BaseListener<storeCreatedEvent>{
    OnMessage(msg: Message, channel: Channel): void {
         
        
        console.log(msg.content.toString()) ;
        channel.ack(msg)

    }

    routingKey: RoutingKeys.storeCreated =  RoutingKeys.storeCreated; 
    
    
    

}