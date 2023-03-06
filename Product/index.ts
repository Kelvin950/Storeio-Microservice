import { connect } from 'http2';
import mongoose, { mongo } from 'mongoose';
import app from './src/app'; 
import {AMQPwrapper} from './AMQP'
import  {StoreCreatedListener} from '@events/Listener/listener'
const PORT =  process.env.PORT || 3000 ;



(async () => {
     
 
  try {
      if (!process.env.MONGO_URI) {
        throw new Error("no mongo uri");
      }
      if (!process.env.JWT_SECRET) {
        throw new Error("jwt_secret error");
      } 



      const conn = await mongoose.connect(process.env.MONGO_URI!);

      console.log(conn.connection.host);

      await  AMQPwrapper.Connect(process.env.AMQP_URI!) 
     

      process.on("SIGTERM" , ()=>{
        AMQPwrapper.Client.close()
      }) ;

   process.on("SIGINT", () => {
     AMQPwrapper.Client.close();
   });
   
    

   await  new StoreCreatedListener(AMQPwrapper.Channel!).listen()

       

      app.listen(PORT, () => {
       console.log("server opened");
      });

  } catch (error) {
    console.log(error)
  }

})()