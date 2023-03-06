import {BasePublisher, RoutingKeys , productCreatedEvent } from '@kelvin9502/shared' ;


export class productCreatedPublsiher extends BasePublisher<productCreatedEvent>{
     

    routingKey: RoutingKeys.productCreated =  RoutingKeys.productCreated;

}


