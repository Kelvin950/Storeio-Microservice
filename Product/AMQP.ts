import {Channel, connect, Connection} from 'amqplib'; 




class AMQP  {

 _client?:Connection ;
 _channel?:Channel ;

 get Client(){

    if(!this._client){
        throw new Error("Connection failed");
    }

    return this._client ;
 }


 get Channel(){
      if (!this._client) {
        throw new Error("Connection failed");
      }

      return this._channel;
 }

      async Connect(url:string){
         
        this._client =  await connect(url) ;

        this._channel = await this._client.createChannel()
          

      }
  



}

export const AMQPwrapper=  new AMQP()