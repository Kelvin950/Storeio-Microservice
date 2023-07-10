import {Connection , Channel, connect} from 'amqplib'


class AMQPLIBWRAPPER {
  private _channel?: Channel;
  private _client?: Connection;

  get client() {
    if (!this._client) throw new Error("cannot connect to client");

    return this._client;
  }

  get channel() {
    if (!this._channel) throw new Error("cannot connect to channel");

    return this._channel;
  }

  async Connect(url: string) {
    try {
      this._client = await connect(url);
      this._channel = await this._client.createChannel();
    } catch (error) {
      throw error;
    }
  }
}



export const AMQPWRAPPER =  new AMQPLIBWRAPPER()