import app from "./src/app";
import mongoose from "mongoose";
import  {AMQP} from './amqplibWrapper' ;
import  {Listener} from './Listener'
const PORT = process.env.PORT || 3000;

console.log("dr");

(async () => {

  try {
    if (!process.env.SECRET) throw new Error("no cookie secret ");
    if (!process.env.MONGO_URI) throw new Error("no mongo uri");
        if (!process.env.JWT_SECRET) throw new Error("no jwt secret");
        if(!process.env.AMQP_URI)throw new Error("no amqp uri")

         await AMQP.Connect(process.env.AMQP_URI);

         process.on("SIGINT" , async()=>{
            await AMQP.client.close()
         })
                  process.on("SIGTERM", async () => {
                    await AMQP.client.close();
                  });
     
        

    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(connect.connection.host);
     

    await new Listener(AMQP.channel).listen();

    app.listen(PORT, () => {
      console.log("SERVER OPENED ");
    });
  } catch (error) {
    console.log(error);
  }
})();

