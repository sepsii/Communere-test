import { Injectable } from '@angular/core';
import { UserLocation } from '../models/user-location.model';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  key: string = 'user_data'


  add(item: UserLocation) {
    const allItems = this.get()
    allItems.push(item)
    debugger
    localStorage.setItem(this.key, JSON.stringify(allItems));
  }

  addAll(item) {
    localStorage.setItem(this.key, JSON.stringify(item));
  }


  get() {
    const item = localStorage.getItem(this.key);
    if (item) {
      return JSON.parse(item);
    } else {
      return [];
    }
  }


  delete(locationDetails: Location) {
    let allLocations: UserLocation[] = this.get()
    const afterItemDeletedLocations = allLocations.filter(i => {
      return i.locationDetails.lat === locationDetails.lat &&
        i.locationDetails.lng === locationDetails.lng;
    })

    const updatedLocations = afterItemDeletedLocations;
    this.addAll(updatedLocations)
  }



  update(locationDetails: UserLocation) {
    const all: UserLocation[] = this.get()
    const current = all.findIndex(i => {
      return i.locationDetails.lat === locationDetails.locationDetails.lat &&
        i.locationDetails.lng === locationDetails.locationDetails.lng;
    });
    all[current] = locationDetails;
    this.addAll(all)

  }

  deleteAllStorageItems(key: string): void {
    localStorage.removeItem(key);
  }


}
