import {app} from './src/app';
import  mongoose from 'mongoose';
const PORT =  process.env.PORT || 3000;
import "dotenv/config";
(async()=>{
  


  try {
    
      if (!process.env.MONGO_URI) {

        throw new Error("failed to connect to mongoinstance");
}


 if(!process.env.JWT_SECRET){
           throw new Error("NO JWT secret provided");
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