import {BasePublisher , RoutingKeys, storeCreatedEvent} from '@kelvin9502/shared'

export class Publish extends BasePublisher<storeCreatedEvent>{
 

    routingKey: RoutingKeys.storeCreated =  RoutingKeys.storeCreated;
} ;

