import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fileSizeValidator(maxSize: number): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        const file = control.value;
        if (file) {
            const fileSize = file.size;
            if (fileSize > maxSize) {

                return { fileSizeExceedsLimit: { value: true, maxSize: maxSize } }
            }
        }
        return null;
    };
}