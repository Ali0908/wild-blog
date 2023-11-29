import { AbstractControl, ValidationErrors, ValidatorFn } from  "@angular/forms"

export  const  confirmPasswordValidator:  ValidatorFn  = (control:AbstractControl):  ValidationErrors|  null  =>{
    const  password  =  control.get('password');
    const  confirmpassword  =  control.get('confirmPassword');
    if( password?.value  !=  confirmpassword?.value){
    return {
        passwordmatcherror :  true
    }
    }
    return  null;
}
