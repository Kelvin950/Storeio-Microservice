import { BaseListener, RoutingKeys } from "@kelvin9502/shared";
import { Channel } from "amqplib";

interface BaseEvents {
  routingKey: RoutingKeys.auth;
  msg: {
    id: string;
    name: string;
  };
}


export class Listener  extends BaseListener<BaseEvents>{
 

   routingKey: RoutingKeys.auth =  RoutingKeys.auth;


     OnMessage(msg: { id: string; name: string; }, channel: Channel): void {
        
          
       console.log(msg);
       channel.ack(msg);

    }


}