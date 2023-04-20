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
    const allItems: UserLocation[] = this.get()
    allItems.push(item)
    localStorage.setItem(this.key, JSON.stringify(allItems));
  }


  addAll(item: UserLocation[]) {
    localStorage.setItem(this.key, JSON.stringify(item));
  }


  get(): UserLocation[] | [] {
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
      return i.locationDetails.lat != locationDetails.lat &&
        i.locationDetails.lng != locationDetails.lng;
    })
    this.addAll(afterItemDeletedLocations)
  }



  update(locationDetails: UserLocation) {
    const all: UserLocation[] = this.get()
    const index = all.findIndex(i => {
      return i.locationDetails.lat === locationDetails.locationDetails.lat &&
        i.locationDetails.lng === locationDetails.locationDetails.lng;
    });
    if (index === -1) {
      return;
    }
    all[index] = locationDetails;
    this.addAll(all)

  }

  deleteAllStorageItems(key: string): void {
    localStorage.removeItem(key);
  }


}
