import { connect } from 'http2';
import mongoose, { mongo } from 'mongoose';
import app from './app'; 
const PORT =  process.env.PORT || 3000 ;



(async () => {
     
 
    if(!process.env.MONGO_URI){
        throw new Error("no mongo uri");
    }
    if(!process.env.JWT_SECRET){
        throw new Error("jwt_secret error");
    }
    

    const conn =  await mongoose.connect(process.env.MONGO_URI!) ;

    console.log(conn.connection.host); 


    app.listen(PORT , ()=>{
        "server opened";
    })


})()