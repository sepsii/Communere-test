import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }
  getErrorMessage(control: AbstractControl) {
    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (control.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    }



    if (control.hasError('fileSizeExceedsLimit')) {
      return `File size exceeds the limit of ${control.errors?.['fileSizeExceedsLimit'].maxSize} KB`;
    }
    else { return '' }

  }
}
