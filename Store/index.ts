import {app} from './src/app';
import  mongoose from 'mongoose';
import {AmqplibWrapper} from './AMQPwrapper' ;
import {productCreatedListener} from '@events/listeners/productCreatedListener'
const PORT =  process.env.PORT || 3000;

import "dotenv/config";
import { ProductUpdatedListener } from '@events/listeners/productUpdated';
(async()=>{
  


  try {
    
      if (!process.env.MONGO_URI) {

        throw new Error("failed to connect to mongoinstance");
}


 if(!process.env.JWT_SECRET){
           throw new Error("NO JWT secret provided");
}
 
if(!process.env.AMQP_URI) throw new Error("NO amqp uri  provided");

 


   
const connect =  await mongoose.connect(process.env.MONGO_URI);
     console.log(connect.connection.host);
    
     
    await AmqplibWrapper.Connect(process.env.AMQP_URI!) 


    process.on("SIGTERM" ,async()=>{
      await AmqplibWrapper.client.close()
    } )

    process.on("SIGINT" ,async () => {
        await AmqplibWrapper.client.close();
    })

    // await new StoreCreatedListener(AmqplibWrapper.channel).listen()   
  await new productCreatedListener(AmqplibWrapper.channel).listen();
  await new ProductUpdatedListener(AmqplibWrapper.channel!).listen();
     app.listen(PORT , ()=>{
        console.log("port opened");
     })

     
     
  } catch (error) {
     console.log(error) ;
  }
})()