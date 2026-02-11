import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import { fetchProducts } from "../services/ProductService";
import ProductsList from "./ProductsList";
import OrderLocation from "./OrderDeliveryLocation";
import StepsHeader from "./StepsHeader/StepsHeader";
import "./style.css";
import { OrderLocationData } from "../model/OrderLocation";
import OrderSummary from "./OrderSummary";
import Footer from "../Footer";
import { checkIfIsSelected } from "../helpers/helpers";
import { formatPrice } from "./ProductsList/ProductCard";
import { saveOrder } from "../services/OrderService";
import {toast} from 'react-toastify';

function Orders() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
  const totalPrice = selectedProducts.reduce((total, item) => total+item.price*12.47, 0)

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        toast.warning('Erro ao listar produtos');
      });
  }, []);


  const handleSelectedProduct = (product: Product) => {

    const isAlreadySelected = checkIfIsSelected(selectedProducts, product);
  
    if (isAlreadySelected) {
      const selected = selectedProducts.filter(item => item.id !== product.id);
      setSelectedProducts(selected);
    } else {
      setSelectedProducts(previous => [...previous, product]);
    }
  }

  const handleSubmit = () => {
    const productsIds = selectedProducts.map(({ id }) => ({ id }));
    const payload = {
      ...orderLocation!,
      products: productsIds
    }
  
    saveOrder(payload).then((response) => {
      toast.success(`Pedido enviado com sucesso! № ${response.data.id}`);
      setSelectedProducts([]);
    }).catch(() => {
        toast.warning('Erro ao enviar pedido');
    })
  }


  return (
    <>
      <div className="orders-container">
        <StepsHeader />
        <ProductsList 
          products={products}
          onSelectProduct={handleSelectedProduct}
          selectedProducts={selectedProducts}
        />
        <OrderLocation
         onChangeLocation={(location) => setOrderLocation(location)}
        />
        <OrderSummary 
        amount={selectedProducts.length}
        totalPrice={totalPrice}
        onSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </>
  );
}

export default Orders;
