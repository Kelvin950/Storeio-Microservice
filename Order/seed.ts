import {Client} from 'cassandra-driver'
export const createStore =async (client:Client)=>{
try {
    const operation = ``;

    await client.execute(operation); 
} catch (error) {
   
    throw error
}
}

export const createProduct = async (client: Client) => {
  try {
    const operation = ``;

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