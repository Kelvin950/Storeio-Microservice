import {app} from './src/app';
import  mongoose from 'mongoose';
const PORT =  process.env.PORT || 3000;
(async()=>{
  


  try {
    
      if (!process.env.MONGO_URI) {

        throw new Error("failed to connect to mongoinstance");
}

   
const connect =  await mongoose.connect(process.env.MONGO_URI);
     console.log(connect.connection.host);
    
     
     app.listen(PORT , ()=>{
        console.log("port opened");
     })
     
  } catch (error) {
     console.log(error) ;
  }
})()