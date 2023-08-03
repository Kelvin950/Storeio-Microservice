export  interface Store {
 
orderid:string ;
quantity: number ;
totalAmount:number
}

export interface Product {
storeid:string ; 
id:string ;
price:number;
quantity:number ; 


}


export interface order {

    totalAmount:number ;
    products:Product[]
}