import {app} from './src/app' ;
import  {AMQPWRAPPER } from './AMQP' ;
import  {Client } from 'cassandra-driver' ;
import path from 'path';
import 'dotenv/config';
import { productCreatedListener } from './src/events/Listener/ProductCreatedlistener';
import { productUpdatedListener} from './src/events/Listener/ProductUpdatedListener';
import { StoreCreatedListener } from './src/events/Listener/StoreCreatedListener';
import { createOrderbystoreid, createOrderbyuserid, createOrderdetailsbyuserid, createProduct, createStore } from './seed';
import exp from 'constants';
const PORT=  process.env.PORT || 3000;

let client: Client ;


(async()=>{

 


    try {
        
     
      
      
 

       if(!process.env.JWT_SECRET) throw new Error('no  jwt secret ')
     

       if(!process.env.AMQP_URI) throw new Error('no amqp uri') ;

        if (!process.env.username) throw new Error("no username");
         if (!process.env.secretid) throw new Error("no cassandra secret");

await AMQPWRAPPER.Connect(process.env.AMQP_URI) ;


await  new productCreatedListener(AMQPWRAPPER.channel).listen() ; 

await new productUpdatedListener(AMQPWRAPPER.channel).listen() ;

await  new StoreCreatedListener(AMQPWRAPPER.channel).listen();


process.on('SIGINT' , async()=>{

    await  AMQPWRAPPER.client.close() ;
})


      

process.on("SIGTERM", async () => {
  await AMQPWRAPPER.client.close();
});

console.log(path.resolve(__dirname, "secure-connect-workshop.zip"));
console.log(process.env.username , process.env.secretid)
client = new Client({
  cloud: {
    secureConnectBundle: path.resolve(__dirname, "secure-connect-workshop.zip"),
  },

  credentials: {
    username: process.env.username,
    password: process.env.secretid,
  },
});


await client.connect() ;

        createStore(client) ;
        createProduct(client)
        createOrderbystoreid(client) 
        createOrderbyuserid(client) 
        createOrderdetailsbyuserid(client)
//
console.log(client.hosts)  ;

        app.listen(PORT, ()=>{

            console.log("Server opened") ;
        })


    } catch (error) {
        

        console.log(error)
    }

})()



export {client}