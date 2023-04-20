import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, marker } from 'leaflet';
import { Location } from 'src/app/models/location.model';
import { UserLocation } from 'src/app/models/user-location.model';
import { mapOptions, MarkerOptions } from 'src/app/configs/map-config'
import { LocationService } from 'src/app/services/location.service';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  @Output() addLocation = new EventEmitter<Location>;

  @Input() locations: UserLocation[]

  options = mapOptions
  markerOptions: L.MarkerOptions = MarkerOptions
  map: L.Map;
  allMarkers: L.Marker[] = [];


  constructor(private elementRef: ElementRef, private locationService: LocationService) { }

  onMapReady(map: L.Map): void {
    this.map = map;
    this.addAllMarkersToMap()
  }



  onMapClick(event: { latlng: LatLng }): void {
    const markerPosition = event.latlng;
    this.addLocation.emit(markerPosition)
  }


  addAllMarkersToMap(): void {
    for (const location of this.locations) {
      this.addMarker(location)
    }
  }


  addMarker(location: UserLocation): void {
    const customPopup = L.popup({ closeButton: false }).setContent(
      `
      <div>
      <div >
          Location Details
      </div>
      <div>
          ${location.name}
      </div>
      <div style="display: flex;flex-direction: row;justify-content: end; gap: 10px;">
          <button style="background-color: beige;" class="close"> close</button>
          <button style="background-color: rgb(121, 183, 231);" class="delete"> delete</button>
      </div>
  </div>
        `
    );

    const markers = marker(location.locationDetails, this.markerOptions).addTo(this.map).bindPopup(customPopup).on("popupopen", () => {
      this.elementRef.nativeElement
        .querySelector(".close")
        .addEventListener("click", e => {
          this.close();
        });
    })
      .on("popupopen", () => {
        this.elementRef.nativeElement
          .querySelector(".delete")
          .addEventListener("click", e => {
            this.delete(location.locationDetails, markers);
          });
      });
    this.allMarkers.push(markers)
  }



  close(): void {
    this.map.closePopup()

  }


  delete(location, markers): void {

    const markerGroup = L.featureGroup(this.allMarkers);

    this.allMarkers.forEach(marker => {

      this.map.removeLayer(markers);
    });

    this.map.invalidateSize();
    this.map.fitBounds(markerGroup.getBounds());


    this.locationService.deleteLocation(location)

  }






}
