import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from './services/location.service';
import { Subscription } from 'rxjs';
import { UserLocation } from './models/user-location.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  allLocationsSubscription: Subscription
  allLocations: UserLocation[]


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
}
