import  {MongoMemoryServer} from 'mongodb-memory-server';
import  app  from '../../app';
import request from 'supertest';


describe("testing the routes handlers" ,()=>{
     

     it("should return a 200" , async ()=>{
      
        return   request(app)
        .post("/api/users/create")
        .send({
            name:"password" ,
            password:"password"

        })
        .expect(201)


     })

})


