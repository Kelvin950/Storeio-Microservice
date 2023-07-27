
 import {Request , Response} from "express" ;
 import {client} from '../../index'
 import cassandra from 'cassandra-driver'
export const createOrder = async(req:Request , res:Response)=>{
   
    
const orders =  req.body ; 
 
let products =  orders.products ;
 
let orderid = cassandra.types.Uuid.random()
  
const useridquery = `INSERT INTO chatsandra.ORDER_BY_USERID(userid , totalAmount , orderid )
VALUES(? ,?,?)`
const useridparams= [req.user?.id, orders.totalAmount ,orderid]; 

let queries:any =[]  ;

products.forEach((product:any)=>{
  
const query1 = `INSERT INTO chatsandra.ORDERDETAILS_BY_USERID(userid,
  orderid,
  productid,
  storeid,
  price,
  quantity)VALUES(? ,? ,? ,? ,? ,?)`;
  const param = [req.user?.id, orderid, product.id , product.storeid , product.price , product.quantity]
 const query2 = `INSERT INTO chatsandra.ORDER_BY_STORE_ID(
      storeid,
  orderid,
  userid,
  productid,
  price,
  quantity,
  totalamount 
 ) VALUES(?,?,?,?,?,?,?)`; 
const param2 =[product.storeid , orderid ,req.user?.id , product.id , product.price , product.quantity , orders.totalAmount]

queries.push({query:query1 , params:param} , {query:query2 , params:param2})
})
 

await  client.batch(queries , {prepare:true})

// const orderDetail = `INSERT INTO  chatsandra.ORDERDETAIL_BY_USERID(userid , orderid , productid , storeid , price, quantity )
// VALUES(?,?,?,?,?,?)`

// const orderDetailquery = [orders.userid , orderid , user.]

 
 

 
 
     

}