import { Injectable } from '@angular/core';
import { UserLocation } from '../models/user-location.model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  key: string = 'user_data'


  add(item:UserLocation) {
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


  delete(item) {
    // let customers:  = this.get()
    // const afterItemDeletedCustomers = customers.filter(i => i.email !== email);
    // const updatedCustomers = afterItemDeletedCustomers;
    // this.addAll(updatedCustomers)
  }



  // update(item) {
  //   const all = this.get()
  //   const current = all.findIndex(i => i.email === item.email);
  //   all[current] = customer;
  //   this.addAll(all)

  // }

  deleteAllStorageItems(key: string): void {
    localStorage.removeItem(key);
  }


}
