export  interface Store {
 
orderid:string ;
quantity: number ;
totalAmount:number;
userid:string;
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