import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { getImageUrl } from 'leaflet-image';
import { Location } from 'src/app/models/location.model';
import { UserLocation } from 'src/app/models/user-location.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { LocationService } from 'src/app/services/location.service';
import { fileSizeValidator } from 'src/app/validator/fileSizeValidator';

export const dropDownOptions = [
  { value: 1, label: 'Business' },
  { value: 2, label: 'Home' },
  { value: 3, label: 'Cafe' },
];

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})

export class EditLocationComponent implements OnInit, OnChanges {
  @Input() allLocations: UserLocation[]

  addLocationForm: FormGroup;
  showMap: boolean = false
  locationImage = null
  logo: string | null
  dropDownOptions = dropDownOptions
  maxFileSize = 512 * 512;

  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    public formValidationService: FormValidationService,
  ) {

  }
  ngOnInit(): void {
    this.addLocationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      locationDetails: ['', Validators.required],
      type: [dropDownOptions[0].value, Validators.required],
      logo: ['', [Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allLocations']) {
      console.log('edit location allLocations', changes['allLocations'].currentValue);

    }
  }


  submit() {

    if (!this.addLocationForm.valid) {
      this.addLocationForm.markAllAsTouched()
    }
    else {
      const location = {
        name: this.addLocationForm.controls['name'].value,
        locationDetails: this.addLocationForm.controls['locationDetails'].value,
        type: this.addLocationForm.controls['type'].value,
        logo: this.addLocationForm.controls['logo'].value,
      }
      this.locationService.addLocationToStorage(location)
      this.addLocationForm.reset()
      this.logo = null
    }
  }


  onFileSelected(event: any): void {
    this.addLocationForm.controls['logo'].markAsTouched()
    const file: File = event.target.files[0];

    if (file && file.size > this.maxFileSize) {
      const control = { value: file };
      const validator = fileSizeValidator(this.maxFileSize);
      const errors = validator(control as AbstractControl);
      this.addLocationForm.controls['logo'].setErrors(errors)
      console.log(this.addLocationForm.controls['logo']);
    }
    else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imageBase64 = reader.result as string;
        this.addLocationForm.controls['logo'].setValue(imageBase64);
        this.logo = imageBase64
      }
    };
  }


  setShowMap() {
    this.showMap = true
  }


  onLocationSelected(location: Location) {
    this.showMap = false
    this.addLocationForm.controls['locationDetails'].setValue(location)
  }


  close() {
  }


  
}
