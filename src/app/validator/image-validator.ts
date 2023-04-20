import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function imageValidator(file: File): ValidatorFn {
    // const file = control.value as File;
    // const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    // if (file && allowedTypes.indexOf(file.type) === -1) {
    //     return { 'image': true };
    // }
    // return null;
    return (control: AbstractControl): ValidationErrors | null => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const file = control.value;

        if (file && allowedTypes.indexOf(file.type) === -1) {
            return { 'image': true };
        }
        return null;
    };
}