
 import {Request , Response} from "express" ;
 import {client} from '../../index'
 import cassandra from 'cassandra-driver' 
 import { randomUUID } from "crypto";
 import uuid from 'uuid'
import { buffer } from "stream/consumers";
export const createOrder = async(req:Request , res:Response)=>{
   
    
const orders =  req.body ; 
 
let products =  orders.products ;
console.log(products)
 
let orderid =  cassandra.types.Uuid.fromString("84121060-c66e-11ea-a82e-f931183227ac");

console.log(orderid.toString())
  
const useridquery = `INSERT INTO chatsandra.ORDER_BY_USERID(userid , totalAmount , orderid )
VALUES(? ,?,?)`
const useridparams= [req.user?.id, orders.totalAmount ,orderid.toString()]; 

let queries:any =[{query:useridquery , params:useridparams}]  ;

products.forEach((product:any)=>{
  
const query1 = `INSERT INTO chatsandra.ORDERDETAILS_BY_USERID(userid,
  orderid,
  productid,
  storeid,
  price,
  quantity)VALUES(? ,? ,? ,? ,? ,?)`;
  const param = [req.user?.id, orderid.toString(), product.id , product.storeid , product.price , product.quantity]
 const query2 = `INSERT INTO chatsandra.ODER_BY_STORE_ID(
      storeid,
  orderid,
  userid,
  productid,
  price,
  quantity,
  totalamount 
 ) VALUES(?,?,?,?,?,?,?)`; 
const param2 =[product.storeid , orderid.toString() ,req.user?.id , product.id , product.price , product.quantity , orders.totalAmount]

queries.push({query:query1 , params:param} , {query:query2 , params:param2})
})
 
console.log(queries)
const result = await  client.batch(queries , {prepare:true})


console.log(result) ;


res.send("done")
// const orderDetail = `I NSERT INTO  chatsandra.ORDERDETAIL_BY_USERID(userid , orderid , productid , storeid , price, quantity )
// VALUES(?,?,?,?,?,?)`

// const orderDetailquery = [orders.userid , orderid , user.]

 
 

 
 
     

}