import {Client} from 'cassandra-driver'
export const createStore =async (client:Client)=>{
try {
    const operation = `CREATE TABLE IF NOT EXISTS chatsandra.STORE(
        storeid text , 
        name text ,
        userid text ,
        createdAt timestamp,
        PRIMARY KEY(storeid , createdAt)

         
    )WITH CLUSTERING ORDER BY(createdAt ASC);`;

    
    await client.execute(operation, [], { prepare: true }); 
   
} catch (error) {
   
    throw error
}
}

export const createProduct = async (client: Client) => {
  try {
    const operation = `CREATE TABLE IF NOT EXISTS chatsandra.PRODUCT (
    productid text,
    name text,
    description text,
    price int,
    storeid text,
    createdAt timestamp,
    PRIMARY KEY (productid, createdAt)
  ) WITH CLUSTERING ORDER BY (createdAt DESC);
`;

    await client.execute(operation , [] ,  {prepare:true});
  } catch (error) {
    throw error;
  }
};


export const createOrderbyuserid = async(client: Client) => {
  try {
    const operation = `CREATE TABLE IF NOT EXISTS chatsandra.ORDER_BY_USERID(
    userid text  ,
    totalAmount decimal ,
    orderid UUID ,
    PRIMARY KEY(userid , orderid)


    )`;

    await client.execute(operation);
  } catch (error) {
    throw error;
  }
};


export const createOrderdetailsbyuserid =async (client:Client) => {
   try {
     const operation = `CREATE TABLE IF NOT EXISTS chatsandra.ORDERDETAILS_BY_USERID(
     userid text,
  orderid UUID,
  productid text,
  storeid text,
  price decimal,
  quantity int,
PRIMARY KEY((userid, orderid) ,productid)
    )`;

     await client.execute(operation);
   } catch (error) {
     throw error;
   }

}



export const createOrderbystoreid = async (client: Client) => {
  try {
    const operation = `CREATE TABLE IF NOT EXISTS chatsandra.ODER_BY_STORE_ID (
  storeid text,
  userid text,
  orderid uuid,
  productid text,
  price decimal,
  
  quantity int,
  totalamount decimal,
  PRIMARY KEY (storeid , userid)
    )
    `;

    await client.execute(operation);
  } catch (error) {
    throw error;
  }
};

