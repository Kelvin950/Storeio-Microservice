import {Channel , Connection ,connect} from 'amqplib'

class AMQP{


 
 private _client?:Connection ; 
 private _channel?:Channel ;

get client(){

    if(!this._client){
        throw new Error("Connection to amqp failed");
    }

    return this._client
}

get channel(){

  if (!this._channel) {
    throw new Error("Connection to amqp failed");
  }

  return this._channel;
}

 
  async Connect(url:string){
     
    this._client = await connect(url); 
     
    this._channel =  await this._client.createChannel() ;


   }

 }


 export const AmqplibWrapper = new AMQP(); 