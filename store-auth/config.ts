import { buffer } from "stream/consumers";
import 'dotenv/config'

export const  config = {

  MONGO_URI : Buffer.from(process.env.MONGO_URI! , 'base64').toString('utf-8'),
  
  SECRET  : Buffer.from(process.env.SECRET! , 'base64').toString('utf-8'),

  JWT_SECRET : Buffer.from(process.env.JWT_SECRET! , 'base64').toString('utf-8'), 

}