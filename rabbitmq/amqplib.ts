import { Channel, connect, Connection } from "amqplib";



export class Amqp{



    
    _client?:Connection ;
    _channe1?:Channel ; 



    async  Connect(url:string){

        
        this._client  = await connect(url)
         
        this._channe1  =  await this._client.createChannel();
    }


}


export const AMQP = new Amqp();
