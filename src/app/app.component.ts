import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LocationService } from './services/location.service';
import { Subscription } from 'rxjs';
import { UserLocation } from './models/user-location.model';
import { Location } from './models/location.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  allLocationsSubscription: Subscription
  allLocations: UserLocation[]
  showEditPage: boolean = false
  initData: UserLocation = { name: '', locationDetails: { lat: 0, lng: 0 }, type: 'business', logo: '' }
  userLocation: UserLocation = this.initData
  test
  @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.allLocationsSubscription = this.locationService.allLocations.subscribe((res: UserLocation[]) => {
      this.allLocations = res
      console.log('resss', res);

    })
  }

  ngOnDestroy(): void {
    if (this.allLocationsSubscription) {
      this.allLocationsSubscription.unsubscribe()

    }
  }

  onEditLocation(location) {
    // console.log('location', location);
    const foundUserLocation = this.locationService.findUserLocation(location)
    if (foundUserLocation) {
      this.userLocation = foundUserLocation
      this.showEditPage = true

    }




  }
  onAddLocation(location) {
    const userLocation = { ...this.initData }
    userLocation.locationDetails = location
    this.userLocation = userLocation
    this.showEditPage = true
  }


  onAddOrEditDone(e) {
    this.showEditPage = false
    this.userLocation = this.initData
  }

  triggerFalseClick() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
  }
}
