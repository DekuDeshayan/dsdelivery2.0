import React, { useEffect, useState } from "react";
import { Product } from "../model/Product";
import { fetchProducts } from "../services/ProductService";
import ProductsList from "./ProductsList";
import OrderLocation from "./OrderDeliveryLocation";
import StepsHeader from "./StepsHeader/StepsHeader";
import "./style.css";

function Orders(){

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts().then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            alert(error.response);
        })
    }, []);


    return (
       <div className="orders-container">
            <StepsHeader/>
            <ProductsList products={products}/>
            <OrderLocation/>
        </div>
    );
}

export default Orders;