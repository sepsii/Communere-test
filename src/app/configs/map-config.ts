import * as L from "leaflet"

export const mapOptions = {
  layers: [
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '...'
    })
  ],
  zoom: 13,
  center: L.latLng(51.505, -0.09)
}


export const MarkerOptions = {
  icon: L.icon({ iconUrl: 'assets/marker-icon.png' })
};