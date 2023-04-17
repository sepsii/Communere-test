import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { getImageUrl } from 'leaflet-image';
import { Location } from 'src/app/models/location.model';
import { UserLocation } from 'src/app/models/user-location.model';
import { LocationService } from 'src/app/services/location.service';

export const dropDownOptions = [
  { value: 'business', label: 'Business' },
  { value: 'home', label: 'Home' },
  { value: 'cafe', label: 'Cafe' },
];

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})

export class EditLocationComponent implements OnInit {
  @Input() data: UserLocation
  @Output() addOrEditDone = new EventEmitter<boolean>

  addLocationForm: FormGroup;
  showMap: boolean = false
  locationImage = null
  logo: string
  dropDownOptions = dropDownOptions
  location: UserLocation



  constructor(private formBuilder: FormBuilder, private locationService: LocationService
  ) {

  }
  ngOnInit(): void {


    this.addLocationForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      locationDetails: [this.data.locationDetails, Validators.required],
      type: [this.data.type, Validators.required],
      logo: [this.logo, Validators.required],
    });
  }




  submit() {
    this.location = {
      name: this.addLocationForm.controls['name'].value,
      locationDetails: this.addLocationForm.controls['locationDetails'].value,
      type: this.addLocationForm.controls['type'].value,
      logo: this.addLocationForm.controls['logo'].value,
    }
    console.log('this form', this.addLocationForm);

    this.locationService.addLocationToStorage(this.location)
    this.addOrEditDone.emit(true)

  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageBase64 = reader.result as string;
      this.addLocationForm.controls['logo'].setValue(imageBase64);
      console.log(imageBase64);
      this.logo = imageBase64

    };
  }

  goToMap() {
    this.showMap = true
  }


  onLocationSelected(location: Location) {
    this.showMap = false
    this.addLocationForm.controls['lanlng'].setValue(location)
  }

  close() {
    this.addOrEditDone.emit(true)
  }

  isTypeSelected(item) {
    if (item.value == this.data.type) {
      return true
    }
    else {
      return false
    }
  }
}
