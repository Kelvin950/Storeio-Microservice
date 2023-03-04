import {MongoMemoryServer} from 'mongodb-memory-server';
import  app from '../src/app';
import mongoose from 'mongoose';

let mongo:any
beforeAll(async ()=>{
       mongo =  new MongoMemoryServer();
       const mongouri = await mongo.getUri();

       await mongoose.connect(mongouri);
}) ; 


beforeEach(async ()=>{


    const coll = await mongoose.connection.db.collections();
    
    for(let c of coll){
        await c.deleteMany({});
    }

})


afterAll(async ()=>{
      mongo.stop(); 

      mongoose.connection.close();
})