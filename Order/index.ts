import {app} from './src/app' ;
import  {AMQPWRAPPER } from './AMQP' ;
const PORT=  process.env.PORT || 3000;



(async()=>{

 


    try {
        
       if(!process.env.SECRET) throw new Error('no cookie secret');

       if(!process.env.Cassandra_URI) throw new Error('no mongo uri');

       if(!process.env.AMQP_URI) throw new Error('no amqp uri') ;


await AMQPWRAPPER.Connect(process.env.AMQP_URI) ;


process.on('SIGINT' , async()=>{

    await  AMQPWRAPPER.client.close() ;
})


      

process.on("SIGTERM", async () => {
  await AMQPWRAPPER.client.close();
});




       


        app.listen(PORT, ()=>{

            console.log("Server opened") ;
        })


    } catch (error) {
        

        throw new Error('connection failed')
    }

})()



