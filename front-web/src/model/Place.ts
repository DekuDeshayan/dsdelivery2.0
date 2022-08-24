export type Place = {
    label?: string; // the ? mark means optional
    value?: string; //the ? mark means optional
    position: {
      lat: number;
      lng: number;
    };
}