import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** A hero's name can't match the given regular expression */
export function confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
        return null;
    }

    const password = passwordControl.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
        return { confirmPassword: { value: control.value } };
    }

    return null;
    };
}
