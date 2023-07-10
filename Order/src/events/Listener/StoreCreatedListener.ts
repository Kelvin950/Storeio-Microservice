import {storeCreatedEvent , BaseListener, RoutingKeys } from '@kelvin9502/shared' ;
import { Message, Channel } from 'amqplib';



export  class  StoreCreatedListener extends BaseListener<storeCreatedEvent>{
 

    routingKey: RoutingKeys.storeCreated =  RoutingKeys.storeCreated ;



    async OnMessage(msg: Message, channel: Channel){
        
    const data =  msg.content.toString() ;


    console.log(data )
        channel.ack(msg) ;

    }


}