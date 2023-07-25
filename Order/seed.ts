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


export const createOrder = async(client: Client) => {
  try {
    const operation = ``;

    await client.execute(operation);
  } catch (error) {
    throw error;
  }
};