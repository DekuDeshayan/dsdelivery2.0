import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import AsyncSelect from 'react-select/async';
import { OrderLocationData } from "../../model/OrderLocation";
import { Place } from "../../model/Place";
import { fetchLocalMapBox } from "../../services/MapApiService";



type Props = {
  onChangeLocation: (location: OrderLocationData) => void;
}

const basePosition = {
  lat: -15.1639442,
  lng: 39.14534,
};


function OrderLocation({ onChangeLocation }: Props) {

  const [address, setAddress] = useState<Place>({
    position: basePosition
  })


  const loadOptions = async (inputValue: string, callback: (places: Place[]) => void) => {
    const response = await fetchLocalMapBox(inputValue);

    const places = response.data.features.map((item: any) => {
        return ({
            label: item.place_name,
            value: item.place_name,
            position: {
                lat: item.center[1],
                lng: item.center[0]
            }
        });
    });

    callback(places);

    // return the Place[], assuming that it inherits from the
    // OptionsOrGroups<Place, GroupBase<Place>> type, of course
    return places;
};

//syncronous approuch
// const loadOptions = (inputValue: string, callback: (places: Place[]) => void) => {
    
//   // use .then(...) callbacks to turn this synchronous
//   fetchLocalMapbox(inputValue)
//   .then(response => {
//       const places = response.data.features.map((item: any) => ({
//           label: item.place_name,
//           value: item.place_name,
//           position: {
//               lat: item.center[1],
//               lng: item.center[0]
//           }
//       }));

//       callback(places);
//   });

// };



  const handleChangeSelect = (place: Place) => {
    setAddress(place);
    onChangeLocation({latitude: place.position.lat, longitude: place.position.lng, address: place.label!});
  };



  return (
    <div className="order-location-container">
      <div className="order-location-content">
        <h3 className="order-location-title">
          Selecione onde o pedido deve ser entregue:
        </h3>
        <div className="filter-container">
          <AsyncSelect
          placeholder="Digite o endereço de entrega do pedido"
          className="filter"
          loadOptions={loadOptions}
          onChange={ value => handleChangeSelect(value as Place)}//the action to be done when info changes...in select which is change de basePosition and set an order location onChange
          />
        </div>

        <MapContainer 
          center={address.position}
          zoom={13}
          scrollWheelZoom
          key={address.position.lat}
          >
          <TileLayer
            //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            url="https://api.mapbox.com/styles/v1/mh4life/cl6y69yhw008d15o344osi2lu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWg0bGlmZSIsImEiOiJjbDZ5N2k0NWUwN3VqM2ttcHB6emZidzhzIn0.CRrAKXpNjEwQPtOi-brBIg"
           //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={address.position}>
            <Popup>
              {address.label}
            </Popup>
          </Marker>
        </MapContainer>

      </div>
    </div>
  );
}

export default OrderLocation;



