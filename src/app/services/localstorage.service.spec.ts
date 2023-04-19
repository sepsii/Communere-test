import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from './localstorage.service';
import { UserLocation } from '../models/user-location.model';
import { Location } from '../models/location.model';

describe('LocalstorageService', () => {
  let service: LocalstorageService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add an item to local storage', () => {

    service.add(fakeData);
    const storedData = JSON.parse(localStorage.getItem('user_data')!);
    expect(storedData[0]).toEqual(fakeData);
  });

  it('should get all items from local storage', () => {

    localStorage.setItem('user_data', JSON.stringify([fakeData]));
    const items = service.get();
    expect(items).toEqual([fakeData]);
  });

  it('should delete an item from local storage', () => {

    localStorage.setItem('user_data', JSON.stringify(fakeDataArray));
    const locationDetails: Location = {
      lat: 12,
      lng: 1230,
    };
    service.delete(locationDetails);
    const storedData = JSON.parse(localStorage.getItem('user_data')!);
    expect(storedData).toEqual(fakeDataArray[1]);
  });

  it('should update an item in local storage', () => {


    localStorage.setItem('user_data', JSON.stringify(fakeDataArray));
    const updatedLocation: UserLocation = {
      name: 'not sepehr',
      locationDetails: {
        lat: 0,
        lng: 0
      }, type: 'business', logo: 'erere'
    }
    service.update(updatedLocation);
    const storedData = JSON.parse(localStorage.getItem('user_data')!);
    expect(storedData).toEqual(fakeDataArray[0]);
  });

  it('should delete all storage items', () => {
    localStorage.setItem('user_data', 'test');
    service.deleteAllStorageItems('user_data');
    const storedData = localStorage.getItem('user_data');
    expect(storedData).toBeNull();
  });
});
