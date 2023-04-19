import { Component, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { LatLng, marker } from 'leaflet';
import { Location } from 'src/app/models/location.model';
import leafletImage from 'leaflet-image';
import { UserLocation } from 'src/app/models/user-location.model';
import { mapOptions, MarkerOptions } from 'src/app/configs/map-config'
import { SimpleMapScreenshoter } from 'leaflet-simple-map-screenshoter'



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input() allLocations
  @Output() addLocation = new EventEmitter<Location>;

  locations: UserLocation[]

  options = mapOptions
  markerOptions: L.MarkerOptions = MarkerOptions
  map: L.Map;
  screenshot = new SimpleMapScreenshoter()


  constructor(private elementRef: ElementRef) { }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allLocations']) {
      this.locations = changes['allLocations'].currentValue
    }
  }


  onMapReady(map: L.Map) {
    this.map = map;
    this.addAllMarkersToMap()
    this.screenshot.addTo(this.map)


  }


  onMapClick(event: { latlng: LatLng }) {
    const markerPosition = event.latlng;
    this.addLocation.emit(markerPosition)
  }


  addAllMarkersToMap() {
    for (const location of this.locations) {
      this.addMarker(location)
    }
  }
  addMarker(location: UserLocation) {

    const customPopup = L.popup({ closeButton: false }).setContent(
      `
      <div>
      <div style="color: rgb(76 196 39);
      background-color: rgb(200 212 200);">
          Location Details
      </div>
      <div>
          ${location.name}
      </div>
      <div style="display: flex;flex-direction: row;justify-content: end; gap: 10px;">
          <button style="background-color: beige;" class="close"> close</button>
          <button style="background-color: rgb(121, 183, 231);" class="edit"> edit</button>
      </div>
  </div>
        `
    );

    marker(location.locationDetails, this.markerOptions).addTo(this.map).bindPopup(customPopup).on("popupopen", () => {
      this.elementRef.nativeElement
        .querySelector(".close")
        .addEventListener("click", e => {
          this.close();
        });
    })
      .on("popupopen", () => {
        this.elementRef.nativeElement
          .querySelector(".edit")
          .addEventListener("click", e => {
            // this.edit(markerPosition);
          });
      });
  }



  close() {
    this.map.closePopup()
  }






}
