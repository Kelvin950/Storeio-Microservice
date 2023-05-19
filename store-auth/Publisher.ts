import {BasePublisher ,RoutingKeys } from '@kelvin9502/shared';

 interface BaseEvents{
 
    routingKey:RoutingKeys.auth
    msg:{
        id:string ;
        name:string;
    }

}

export class Publisher extends BasePublisher<BaseEvents>{
 

    routingKey: RoutingKeys.auth=RoutingKeys.auth;

    
}