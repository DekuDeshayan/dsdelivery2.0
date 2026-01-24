import axios from "axios";
import { MAPBOX_ACCESS_TOKEN } from "../common/constants";

export function fetchLocalMapBox(local: string){
   return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${MAPBOX_ACCESS_TOKEN}`)
}