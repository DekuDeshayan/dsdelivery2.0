import { checkIfIsSelected } from "../../helpers/helpers";
import { Product } from "../../model/Product";
import ProductCard from "./ProductCard";

type Props = {
    products : Product[]; 
    selectedProducts: Product[];
    onSelectProduct: (product:Product) => void;
}

function ProductsList({products, onSelectProduct, selectedProducts} : Props){
    return (
       <div className="orders-list-container"> 
            <div className="orders-list-items">
                {products.map(product => (
                    <ProductCard 
                    key={product.id}
                    product={product}
                    onSelectProduct={onSelectProduct}
                    isSelected={checkIfIsSelected(selectedProducts, product)}
                    />
                ))}
            </div>
       </div>
    );
}

export default ProductsList;