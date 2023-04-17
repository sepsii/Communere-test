import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { UserLocation } from '../models/user-location.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  allLocations = new BehaviorSubject(this.getAllLocations())

  constructor(private localStorageService: LocalstorageService
  ) { }

  addLocationToStorage(location: UserLocation) {
    this.localStorageService.add(location)
    this.allLocations.next(this.localStorageService.get())

  }

  getAllLocations(): UserLocation[] {
    return this.localStorageService.get()
  }

  findUserLocation(locationDetails) {
    const allLocations: UserLocation[] = this.localStorageService.get()

    const foundUserLocation = allLocations.find(obj => {
      return obj.locationDetails.lat === locationDetails.lat &&
        obj.locationDetails.lng === locationDetails.lng;
    });

      return foundUserLocation



  }
}
