import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { getImageUrl } from 'leaflet-image';
import { Location } from 'src/app/models/location.model';
import { UserLocation } from 'src/app/models/user-location.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { LocationService } from 'src/app/services/location.service';
import { fileSizeValidator } from 'src/app/validator/file-size-validator';
import { imageValidator } from 'src/app/validator/image-validator'
import { DROPDOWN_OPTIONS } from 'src/app/constants/dropdown-options'
const MAX_FILE_SIZE = 512 * 512;


@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})

export class EditLocationComponent implements OnInit {
  @Input() allLocations: UserLocation[]

  addLocationForm: FormGroup;
  showMap: boolean = false
  locationImage = null
  logo: string | null
  dropDownOptions = DROPDOWN_OPTIONS

  constructor(private formBuilder: FormBuilder,
    private locationService: LocationService,
    public formValidationService: FormValidationService,
  ) {

  }
  ngOnInit(): void {
    this.addLocationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      locationDetails: ['', Validators.required],
      type: [this.dropDownOptions[0].value, Validators.required],
      logo: ['', [Validators.required]],
    });
  }

  submit(): void {
    if (!this.addLocationForm.valid) {
      this.addLocationForm.markAllAsTouched();
      return;
    }

    try {
      const location = {
        name: this.addLocationForm.controls['name'].value,
        locationDetails: this.addLocationForm.controls['locationDetails'].value,
        type: this.addLocationForm.controls['type'].value,
        logo: this.addLocationForm.controls['logo'].value,
      };

      this.locationService.addLocationToStorage(location);
      this.addLocationForm.reset();
      this.logo = null;
    } catch (error) {
      console.error('Error adding location:', error);
    }
  }





  onFileSelected(event: any): void {
    this.addLocationForm.controls['logo'].markAsTouched();
    const file: File = event.target.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    const control = { value: file };
    const imageValidatorRes = imageValidator(file);
    const imageErrors = imageValidatorRes(control as AbstractControl);
    if (imageErrors) {
      console.error('select supporeted formats such as jpeg');
      this.addLocationForm.controls['logo'].setErrors(imageErrors);
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      const control = { value: file };
      const validator = fileSizeValidator(MAX_FILE_SIZE);
      const errors = validator(control as AbstractControl);
      this.addLocationForm.controls['logo'].setErrors(errors);
      console.error('File size exceeds the limit');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageBase64 = reader.result as string;
      if (!imageBase64) {
        console.error('Failed to read file');
        return;
      }
      this.addLocationForm.controls['logo'].setValue(imageBase64);
      this.logo = imageBase64;
    };
    reader.onerror = () => {
      console.error('Failed to read file');
    };
  }









  setShowMap(): void {
    this.showMap = true
  }


  onLocationSelected(location: Location): void {
    this.showMap = false
    this.addLocationForm.controls['locationDetails'].setValue(location)
  }


  close() {
  }



}
