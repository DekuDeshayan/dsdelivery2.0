import axios from "axios";
import { BASE_API_URL } from "../common/constants";

const api_url = `${BASE_API_URL}`;

export function fetchOrders(){
    return axios.get(`${api_url}/order/findall`);
}

export function confirmDelivery(orderId: number){
    return axios.put(`${api_url}/order/${orderId}/delivered`);
}