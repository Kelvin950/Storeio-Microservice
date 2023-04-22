import {RoutingKeys , BaseListener , productCreatedEvent} from '@kelvin9502/shared';
import { Message, Channel } from 'amqplib';
import {Product} from '@models/Product' ;
import { connect } from 'http2';


export class productCreatedListener extends BaseListener<productCreatedEvent>{
   

 async    OnMessage(msg: Message, channel: Channel){
         console.log(msg.content.toString())
      const content= JSON.parse(msg.content.toString()) ;
      console.log(content); 
         const product =  await new Product({
            _id: content.id ,
            name:content.name ,
            storeId:content.storeId ,
            price:content.price , 
            description:content.description
         }
             
            ).save()


        channel.ack(msg)
    }

    routingKey: RoutingKeys.productCreated =  RoutingKeys.productCreated;
 

 


}