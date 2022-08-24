import axios from "axios";
import { BASE_API_URL } from "../common/constants";
import { NewOrder } from "../model/NewOrder";

const API_URL = `${BASE_API_URL}/order`;

export function saveOrder(orderData:NewOrder){
    return axios.post(`${API_URL}/save`, orderData);
}
