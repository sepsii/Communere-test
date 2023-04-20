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

    const errors = control.errors;
    if (!errors) {
      return '';
    }

    switch (Object.keys(errors)[0]) {
      case 'required':
        return 'This field is required';
      case 'minlength':
        return `Minimum length is ${errors['minlength'].requiredLength}`;
      case 'image':
        return `Please select supported formats such as jpeg`;
      case 'fileSizeExceedsLimit':
        return `File size exceeds the limit of ${errors['fileSizeExceedsLimit'].maxSize} KB`;
      default:
        return '';
    }
  }
}
