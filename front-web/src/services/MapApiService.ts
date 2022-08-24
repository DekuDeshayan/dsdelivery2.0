import axios from "axios";
const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function fetchLocalMapBox(local: string){

    //Custom Map tile url
    //mapbox://styles/mh4life/cl6y69yhw008d15o344osi2lu
    //https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/{tilesize}/{z}/{x}/{y}{@2x}

    //https://api.mapbox.com/styles/v1/mh4life/cl6y69yhw008d15o344osi2lu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWg0bGlmZSIsImEiOiJjbDZ5N2k0NWUwN3VqM2ttcHB6emZidzhzIn0.CRrAKXpNjEwQPtOi-brBIg
    return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${mapboxToken}`)

}