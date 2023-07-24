import {Client} from 'cassandra-driver'
export const createStore =async (client:Client)=>{
try {
    const operation = `CREATE TABLE IF NOT EXISTS STORE(
        storeid text , 
        name text ,
        userid text ,
        createdAt timestamp,
        PRIMARY KEY(storeid , createdAt)

         
    )WITH CLUSTERING ORDER BY(createdAt ASC);`;

    const createUniqueNameIndexQuery = `
  CREATE UNIQUE INDEX IF NOT EXISTS ON STORE (name);
  CREATE UNIQUE INDEX IF NOT EXISTS ON STORE (storeid);
`;
    await client.execute(operation); 
    await client.execute(createUniqueNameIndexQuery)
} catch (error) {
   
    throw error
}
}

export const createProduct = async (client: Client) => {
  try {
    const operation = `CREATE TABLE IF NOT EXISTS PRODUCT (
    productid text,
    name text,
    description text,
    price int,
    storeid text,
    createdAt timestamp,
    PRIMARY KEY (productid, createdAt)
  ) WITH CLUSTERING ORDER BY (createdAt DESC);
`;

    await client.execute(operation);
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