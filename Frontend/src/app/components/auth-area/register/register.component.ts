import { FormControl, Validators, FormGroup, ValidatorFn, ValidationErrors, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public user = new UserModel();

    public emailControl = new FormControl(null, [Validators.required, Validators.email]);
    public idNumberControl = new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{9}$")]);
    public passwordControl = new FormControl(null, [Validators.required, Validators.pattern("^.{4,16}$")]);
    public confirmPassControl = new FormControl(null, [Validators.required]);


    ConfirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }


    public passwordForm = this.fb.group({
        password: [null, [Validators.required, Validators.pattern("^.{4,16}$")]],
        confirmPass: [null, [Validators.required]],
    }, { validator: this.ConfirmedValidator('password', 'confirmPass') });

    public userForm = new FormGroup({
        emailControl: this.emailControl,
        idNumberControl: this.idNumberControl,
        // passwordForm: this.passwordForm
    });


    constructor(private fb: FormBuilder, private myAuthService: AuthService, private notify: NotifyService, private myRouter: Router) { }

    public async register() {
        try {
            this.user.email = this.emailControl.value;
            this.user.idNumber = this.idNumberControl.value;
            this.user.password = this.passwordControl.value;
            // await this.myAuthService.register(this.user);
            // this.notify.success("Fill in your information!");
            // this.myRouter.navigateByUrl("/validation");
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }
}
