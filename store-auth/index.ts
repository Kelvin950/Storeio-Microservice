import app from "./src/app";
import mongoose from "mongoose";
import {config} from  './config'
import  {AMQP} from './amqplibWrapper' ;
import  {Listener} from './Listener'
const PORT = process.env.PORT || 3000;

console.log("dr");


(async () => {

  // console.log(
  //   // atob(process.env.SECRET!),
  //   // atob(process.env.MONGO_URI!),
  //   // atob(process.env.JWT_SECRET!),
  //   process.env.AMQP_URI
  // );
 
  try {
    if (!config.SECRET) throw new Error("no cookie secret ");
    if (!config.MONGO_URI) throw new Error("no mongo uri");
        if (!config.JWT_SECRET) throw new Error("no jwt secret");
        if(!process.env.AMQP_URI)throw new Error("no amqp uri")

         await AMQP.Connect(process.env.AMQP_URI);

      
     
        

    const connect = await mongoose.connect(config.MONGO_URI);
    console.log(connect.connection.host);
     
   process.on("SIGINT", async () => {
     await AMQP.client.close();
        await connect.connection.dropCollection("users"); 
   });
   process.on("SIGTERM", async () => {
     await AMQP.client.close();
     await connect.connection.dropCollection("users"); 
     
   
   });
    await new Listener(AMQP.channel).listen();

    app.listen(PORT, () => {
      console.log("SERVER OPENED ");
    });
  } catch (error) {
    console.log(error);
  }
})();

