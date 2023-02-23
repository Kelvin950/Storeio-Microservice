import app from "./src/app";
import mongoose from "mongoose";
import  {AMQP} from './amqplibWrapper'
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    if (!process.env.SECRET) throw new Error();
    if (!process.env.MONGO_URI) throw new Error();
        if (!process.env.JWT_SECRET) throw new Error();

         await AMQP.Connect("amqp://localhost");

         process.on("SIGINT" , async()=>{
            await AMQP.client.close()
         })
                  process.on("SIGTERM", async () => {
                    await AMQP.client.close();
                  });
     
        

    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(connect.connection.host);
     
    

    app.listen(PORT, () => {
      console.log("SERVER OPENED ");
    });
  } catch (error) {
    console.log(error);
  }
})();

