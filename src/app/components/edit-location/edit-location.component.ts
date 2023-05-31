import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from 'src/app/models/location.model';
import { UserLocation } from 'src/app/models/user-location.model';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { LocationService } from 'src/app/services/location.service';
import { fileSizeValidator } from 'src/app/validator/file-size-validator';
import { imageValidator } from 'src/app/validator/image-validator';
import { DROPDOWN_OPTIONS } from 'src/app/constants/dropdown-options';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

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
    private errorHandlingService: ErrorHandlingService
  ) { }


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

      this.locationService.addLocation(location);
      this.addLocationForm.reset();
      this.logo = null;
    } catch (error) {
      this.errorHandlingService.error(`Error adding location: ${error}`)
    }
  }





  onFileSelected(event: any): void {
    this.addLocationForm.controls['logo'].markAsTouched();
    const file: File = event.target.files[0];
    if (!file) {
      this.errorHandlingService.error('no file selected')
      return;
    }

    const control = { value: file };
    const imageValidatorRes = imageValidator(file);
    const imageErrors = imageValidatorRes(control as AbstractControl);
    if (imageErrors) {
      this.addLocationForm.controls['logo'].setErrors(imageErrors);
      return
    }

    const sizeValidator = fileSizeValidator(MAX_FILE_SIZE);
    const sizeErrors = sizeValidator(control as AbstractControl);
    if (sizeErrors) {
      this.addLocationForm.controls['logo'].setErrors(sizeErrors);
      return;
    }

    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageBase64 = reader.result as string;
      if (!imageBase64) {
        this.errorHandlingService.error('failed to read file')
        return;
      }
      this.addLocationForm.controls['logo'].setValue(imageBase64);
      this.logo = imageBase64;
    };
    reader.onerror = () => {
      this.errorHandlingService.error('no file selected')
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
