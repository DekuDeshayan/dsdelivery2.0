import axios from "axios";
import { BASE_API_URL } from "../common/constants";

const API_URL = `${BASE_API_URL}/product`;

export function fetchProducts(){
    return axios.get(`${API_URL}/findall`);
}
