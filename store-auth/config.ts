import { buffer } from "stream/consumers";
import 'dotenv/config'

export const  config = {

  MONGO_URI : Buffer.from(process.env.MONGO_URI! , 'utf-8').toString("utf-8"),
  
  SECRET  : Buffer.from(process.env.SECRET! , 'utf-8').toString('utf-8'),

  JWT_SECRET : Buffer.from(process.env.JWT_SECRET! , 'utf-8').toString('utf-8'), 

}