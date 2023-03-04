
import {Publish} from './publisher';
import {connect} from 'amqplib'
import {AMQP} from './amqplib'



var mockChannel = {
  assertExchange: jest.fn(),
  assertQueue: jest.fn(),
  bindQueue: jest.fn(),
  consume: jest.fn(),
  publish: jest.fn(),
  ack: jest.fn(),
  nack: jest.fn(),
};
var  mockConnection = {
  createChannel: jest.fn().mockResolvedValue(mockChannel),
  close: jest.fn(),
};

// Replace the amqplib functions with our mock functions
jest.mock("amqplib", () => ({
  connect: jest.fn().mockResolvedValue(mockConnection),
}));


describe("amqp" , ()=>{
  
  beforeEach(()=>{

    jest.clearAllMocks();
  })
      
 
      
 

    it("should connect" , async()=>{

   AMQP.Connect("amqp://localhost")
       
     
        // await new Publish(AMQP._channe1!).Publish({name:"" , userId:""})
        //  expect(connectionMock.createChannel.mock.calls.length).toEqual(1);
        // //  
        // expect(amqp.connect).toHaveBeenCalledTimes(1)
        expect(mockConnection.createChannel).toHaveBeenCalledTimes(1)
    })

   
})