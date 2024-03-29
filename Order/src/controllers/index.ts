
 import {Request , Response} from "express" ;
 import {client} from '../../index'
 import cassandra from 'cassandra-driver' 
 import { randomUUID } from "crypto";
 import uuid from 'uuid'
import { buffer } from "stream/consumers";
import { Product, Store, order } from "../interface.types";
import { AuthError } from "@kelvin9502/shared";

export const createOrder = async(req:Request , res:Response)=>{
   
    
const orders:order =  req.body ; 
 const obj:Record<string , Store> = {}
let products:Product[] =  orders.products ;

console.log(products)
 
let orderid =  cassandra.types.Uuid.random().toString();

console.log(orderid)
  
const useridquery = `INSERT INTO chatsandra.ORDER_BY_USERID(userid , totalAmount , orderid )
VALUES(? ,?,?)`
const useridparams= [req.user?.id, orders.totalAmount ,orderid]; 

let queries:any =[{query:useridquery , params:useridparams}]  ;

products.forEach((product:Product)=>{
  
const query1 = `INSERT INTO chatsandra.ORDERDETAILS_BY_USERID(userid,
  orderid,
  productid,
  storeid,
  price,
  quantity)VALUES(? ,? ,? ,? ,? ,?)`;
  const param = [req.user?.id, orderid, product.id , product.storeid , product.price , product.quantity]
 if(obj[product.storeid]){
     obj[product.storeid]["quantity"]++ ;
     obj[product.storeid]["totalAmount"] += product.price

  }
  else {
    obj[product.storeid] = {
      orderid: orderid ,
      quantity: product.quantity ,
      totalAmount:product.price ,
      userid:  req.user?.id!
    }
  }

  
queries.push({query:query1 , params:param})  ;


})  

console.log(obj)

for (let key in obj){


   const query2 = `INSERT INTO chatsandra.ODER_BY_STORE_ID(storeid,
  orderid,
  quantity,
  userid ,
  totalamount 
 ) VALUES(?,?,?, ?, ?)`;
   const param2 = [
     key,
     obj[key].orderid,
     obj[key].quantity,
     
     obj[key].userid,
     obj[key].totalAmount,
   ];


  queries.push({ query: query2, params: param2 });
}
 
console.log(queries)
const result = await  client.batch(queries , {prepare:true})


console.log(result) ;






res.send({
  success:true , message:"Order successfully created"
})
// const orderDetail = `I NSERT INTO  chatsandra.ORDERDETAIL_BY_USERID(userid , orderid , productid , storeid , price, quantity )
// VALUES(?,?,?,?,?,?)`

// const orderDetailquery = [orders.userid , orderid , user.]

 
 

 
 
     

}


export const getByUser= async(req:Request , res:Response)=>{
 
  
  const userid =  req.user?.id ;
 
    
  //search the createorderbyuserid table if user exists 
  
  const query =  `SELECT * FROM CHATSANDRA.ORDER_BY_USERID  WHERE userid =?` ;
  const param = [ userid] ;


  const doc =  await  client.execute(query ,param , {prepare:true}) ;

  console.log(doc) ;


  



  res.send({success:true , data:doc.rows})




}


export const getProductsByOrderid =async (req:Request ,res:Response)=>{

 const {id} =  req.params ;


 const query =  `SELECT * FROM CHATSANDRA.ORDERDETAILS_BY_USERID WHERE  orderid =? AND userid=?` ;

 const param = [id , req.user?.id] ;


 const doc=  await client.execute(query , param , {prepare:true}) ;
 




console.log(doc) ;



res.send({
  success:true , data:  doc.rows
})


}


export const fetchByStoreId=  async (req:Request ,res:Response)=>{
 

  const {id} =  req.params ;

  const quer =  `SELECT * FROM CHATSANDRA.STORE WHERE storeid=?` 

  const document=  await  client.execute(quer, [id] , {prepare:true}) 

  console.log(document)
     
  if(document.rows[0].get("userid") !== req.user?.id){

       throw new  AuthError("forbidden" , 403)

  }
 
  const query =  `SELECT * FROM  CHATSANDRA.ODER_BY_STORE_ID WHERE storeid =?`
  const param = [id]   

  const doc=  await  client.execute(query , param , {prepare:true})
 

  console.log(doc) ;


  res.send({
    success:true , data:doc.rows
  })

}