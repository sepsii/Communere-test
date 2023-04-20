import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor(private errorHandlingService: ErrorHandlingService) { }
  getErrorMessage(control: AbstractControl): string {
    try {
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
    } catch (error) {
      this.errorHandlingService.error('An error occurred while getting the error message');
      return 'An error occurred while getting the error message'
    }
  }

}
