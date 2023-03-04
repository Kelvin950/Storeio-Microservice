import {BaseListener , RoutingKeys, storeCreatedEvent} from '@kelvin9502/shared'
import { Channel, Message } from 'amqplib';

export class listener extends  BaseListener<storeCreatedEvent>{
 OnMessage(msg: Message, channel: Channel): void {
     console.log(msg);
     channel.ack(msg);
 }

 routingKey: RoutingKeys.storeCreated =  RoutingKeys.storeCreated ;




    }

