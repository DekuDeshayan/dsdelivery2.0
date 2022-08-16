import React from "react";
import { Product } from "../../../model/Product";

type Props = {
    product: Product;
}

function formatPrice(price: number){
    const formatter = new Intl.NumberFormat('pt', {
        style: 'currency',
        currency : 'MZN',
        //minimumFractionDigits : 2-> this is default...
    });

    return formatter.format(price);
}

function ProductCard({ product } : Props){
    return (
       <div className="order-card-container">
        <h3 className="order-card-title">
            {product.name}
        </h3>
        <img className="order-card-image" src={product.imageUri} alt={product.name}/>
        <h3 className="order-card-price">
             {formatPrice(product.price * 12.47)}
        </h3>
        <div className="order-card-description">
            <h3>Descricao</h3>
            <p>
            {product.description}
            </p>
        </div>
       </div>
    );
}

export default ProductCard;