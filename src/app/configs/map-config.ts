import { tileLayer, latLng, icon } from "leaflet";
const MARKER_ICON_URL = 'assets/marker-icon.png'
export const mapOptions = {
  layers: [
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '...'
    })
  ],
  zoom: 13,
  center: latLng(51.505, -0.09)
}


export const MarkerOptions = {
  icon: icon({ iconUrl: MARKER_ICON_URL })
};