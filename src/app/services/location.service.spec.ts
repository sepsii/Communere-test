import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { LocalstorageService } from './localstorage.service';
import { UserLocation } from '../models/user-location.model';

describe('LocationService', () => {
  let service: LocationService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalstorageService>;
  let fakeData: UserLocation = {
    name: 'sepehr',
    locationDetails: {
      lat: 0,
      lng: 0
    }, type: 'business', logo: ''
  };
  let fakeDataArray: UserLocation[] = [{
    name: 'sepehr',
    locationDetails: {
      lat: 0,
      lng: 0
    }, type: 'business', logo: 'erere'
  }, {
    name: 'setares',
    locationDetails: {
      lat: 12,
      lng: 1230
    }, type: 'cafe', logo: 'dadadad'
  }]

  const spy = jasmine.createSpyObj('LocalstorageService', ['add', 'get']);
  TestBed.configureTestingModule({
    providers: [
      LocationService,
      { provide: LocalstorageService, useValue: spy }
    ]
  });
  service = TestBed.inject(LocationService);
  localStorageServiceSpy = TestBed.inject(LocalstorageService) as jasmine.SpyObj<LocalstorageService>;

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add location to storage and update allLocations', () => {

    localStorageServiceSpy.get.and.returnValue([]);
    service.addLocationToStorage(fakeData);
    expect(localStorageServiceSpy.add).toHaveBeenCalledWith(fakeData);
    expect(service.allLocations.value).toEqual([fakeData]);
  });


  it('should return all locations from storage', () => {
    localStorageServiceSpy.get.and.returnValue(fakeDataArray);
    const result = service.getAllLocations();
    expect(result).toEqual(fakeDataArray);
  });

  it('should find user location by locationDetails', () => {

    localStorageServiceSpy.get.and.returnValue(fakeDataArray);
    const locationDetails = { lat: 12, lng: 1230 };
    const result = service.findUserLocation(locationDetails);
    expect(result).toEqual(fakeDataArray[1]);
  });
});

