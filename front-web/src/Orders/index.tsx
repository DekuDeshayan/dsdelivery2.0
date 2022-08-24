import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import { fetchProducts } from "../services/ProductService";
import ProductsList from "./ProductsList";
import OrderLocation from "./OrderDeliveryLocation";
import StepsHeader from "./StepsHeader/StepsHeader";
import "./style.css";
import { OrderLocationData } from "../model/OrderLocation";

function Orders(){

    const [products, setProducts] = useState<Product[]>([]);

    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();

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
            <OrderLocation onChangeLocation={location => setOrderLocation(location)}/>
        </div>
    );
}

export default Orders;


