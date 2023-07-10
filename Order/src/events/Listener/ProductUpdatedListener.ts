import {
  productUpdatedEvent,

  BaseListener,
  RoutingKeys,
} from "@kelvin9502/shared";
import { Message, Channel } from "amqplib";

export class productUpdatedListener extends BaseListener<productUpdatedEvent> {
  routingKey: RoutingKeys = RoutingKeys.productUpdated;

  async OnMessage(msg: Message, channel: Channel) {
    const data = msg.content.toString();

    console.log(data);

    channel.ack(msg);
  }
}
