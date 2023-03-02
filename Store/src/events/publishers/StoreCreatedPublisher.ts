import  {BasePublisher ,RoutingKeys,storeCreatedEvent }  from '@kelvin9502/shared'


export class StoreCreatedPublisher extends BasePublisher<storeCreatedEvent>{


      routingKey: RoutingKeys.storeCreated =  RoutingKeys.storeCreated
    



}