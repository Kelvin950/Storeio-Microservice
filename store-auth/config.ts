

export const  config = {

  MONGO_URI :  atob(process.env.MONGO_URI!)  ,
  
  SECRET  : atob(process.env.SECRET!),

  JWT_SECRET : atob(process.env.JWT_SECRET!), 

}