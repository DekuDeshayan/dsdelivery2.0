import { OrderLocationData } from "./OrderLocation";

type productId ={
    id: number;
}

export type NewOrder={
    products: productId[];
} & OrderLocationData;


