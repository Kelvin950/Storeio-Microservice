import {RoutingKeys ,productUpdatedEvent , BasePublisher} from '@kelvin9502/shared'



export class productUpdatedPublisher extends BasePublisher<productUpdatedEvent>{
 
 routingKey: RoutingKeys.productUpdated =  RoutingKeys.productUpdated ; 


 



}