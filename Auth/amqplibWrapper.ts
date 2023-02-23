import {Channel , Connection, ConsumeMessage ,connect} from 'amqplib';


class AmqplibWrapper{


 

    private _channel?:Channel ;
    private _client?:Connection;


 get client(){
         
    if(!this._client) throw new Error("Cannot connect to client before connection");

    return this._client ;

 }

 get channel(){

  if (!this._channel)
    throw new Error("No connection established");

  return this._channel;

 }

    async  Connect(url:string){

        
    this._client = await connect(url); 
     this._channel =  await this._client.createChannel();
        
         

    }


}


export const AMQP = new AmqplibWrapper();