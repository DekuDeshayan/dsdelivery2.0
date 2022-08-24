import { Product } from "../model/Product";

export function checkIfIsSelected(selectedProducts:Product[], product: Product ){
    return selectedProducts.some(item => item.id === product.id);
}